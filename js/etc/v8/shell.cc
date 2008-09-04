// Copyright 2008 Google Inc. All Rights Reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

#include <v8.h>
#include <cstring>
#include <string>
#include <cstdio>
#include <cstdlib>
#include <vector>

void RunShell(v8::Handle<v8::Context> context);
bool ExecuteString(v8::Handle<v8::String> source,
                   v8::Handle<v8::Value> name,
                   bool print_result);
v8::Handle<v8::Value> Print(const v8::Arguments& args);
v8::Handle<v8::Value> Pr(const v8::Arguments& args);
v8::Handle<v8::Value> Load(const v8::Arguments& args);
v8::Handle<v8::Value> ReadFile(const v8::Arguments& args);
v8::Handle<v8::Value> ReadLine(const v8::Arguments& args);
v8::Handle<v8::Value> Quit(const v8::Arguments& args);
v8::Handle<v8::Value> Version(const v8::Arguments& args);
v8::Handle<v8::Value> Parameters(const v8::Arguments& args);
v8::Handle<v8::String> ReadFile(const char* name);
void ProcessRuntimeFlags(int argc, char* argv[]);
  
std::string params = "";

int main(int argc, char* argv[]) {
  v8::V8::SetFlagsFromCommandLine(&argc, argv, true);
  v8::HandleScope handle_scope;
  // Create a template for the global object.
  v8::Handle<v8::ObjectTemplate> global = v8::ObjectTemplate::New();
  global->Set(v8::String::New("print"), v8::FunctionTemplate::New(Print));
  global->Set(v8::String::New("pr"), v8::FunctionTemplate::New(Pr));
  global->Set(v8::String::New("load"), v8::FunctionTemplate::New(Load));
  global->Set(v8::String::New("readfile"), v8::FunctionTemplate::New(ReadFile));
  global->Set(v8::String::New("readline"), v8::FunctionTemplate::New(ReadLine));
  global->Set(v8::String::New("quit"), v8::FunctionTemplate::New(Quit));
  global->Set(v8::String::New("version"), v8::FunctionTemplate::New(Version));
  global->Set(v8::String::New("parameters"), v8::FunctionTemplate::New(Parameters));
  // Create a new execution environment containing the built-in
  // functions
  v8::Handle<v8::Context> context = v8::Context::New(NULL, global);
  // Enter the newly created execution environment.
  v8::Context::Scope context_scope(context);

  bool run_shell = (argc == 1);
  v8::Handle<v8::String> source;
  v8::Handle<v8::String> file_name;
  for (int i = 1; i < argc; i++) {
    const char* str = argv[i];
    if (strcmp(str, "--shell") == 0) {
      run_shell = true;
    } else if (strncmp(str, "--", 2) == 0) {
      printf("Warning: unknown flag %s.\n", str);
    } else if (source.IsEmpty()) {
      v8::HandleScope handle_scope;
      file_name = v8::String::New(str);
      source = ReadFile(str);
      if (source.IsEmpty()) {
        printf("Error reading '%s'\n", str);
        return 1;
      }
    } else {
      params = params + str + " ";
    }
  }
  if (!file_name.IsEmpty()) ExecuteString(source, file_name, false);
  if (run_shell) RunShell(context);
  return 0;
}

// The callback that is invoked by v8 whenever the JavaScript 'print'
// function is called.  Prints its arguments on stdout separated by
// spaces and ending with a newline.
v8::Handle<v8::Value> Print(const v8::Arguments& args) {
  Pr(args);
  printf("\n");
  return v8::Undefined();
}

v8::Handle<v8::Value> Pr(const v8::Arguments& args) {
  bool first = true;
  for (int i = 0; i < args.Length(); i++) {
    v8::HandleScope handle_scope;
    if (first) {
      first = false;
    } else {
      printf(" ");
    }
    v8::String::AsciiValue str(args[i]);
    printf("%s", *str);
  }
  return v8::Undefined();
}

// The callback that is invoked by v8 whenever the JavaScript 'load'
// function is called.  Loads, compiles and executes its argument
// JavaScript file.
v8::Handle<v8::Value> Load(const v8::Arguments& args) {
  for (int i = 0; i < args.Length(); i++) {
    v8::HandleScope handle_scope;
    v8::String::AsciiValue file(args[i]);
    v8::Handle<v8::String> source = ReadFile(*file);
    if (source.IsEmpty()) {
      return v8::ThrowException(v8::String::New("Error loading file"));
    }
    ExecuteString(source, v8::String::New(*file), false);
  }
  return v8::Undefined();
}

// The callback that is invoked by v8 whenever the JavaScript 'read'
// function is called.  Loads the argument file as a string.
v8::Handle<v8::Value> ReadFile(const v8::Arguments& args) {
  if (args.Length() != 1)
    return v8::ThrowException(v8::String::New("Read expecting a single string argument"));
  v8::HandleScope handle_scope;
  v8::String::AsciiValue file(args[0]);
  v8::Handle<v8::String> source = ReadFile(*file);
  if (source.IsEmpty()) {
    return v8::ThrowException(v8::String::New("Error loading file"));
  }
  return source;
}

v8::Handle<v8::Value> ReadLine(const v8::Arguments& args) {
  char str[256];
  scanf("%s",str);
  return v8::String::New(str);
}

// The callback that is invoked by v8 whenever the JavaScript 'quit'
// function is called.  Quits.
v8::Handle<v8::Value> Quit(const v8::Arguments& args) {
  // If not arguments are given args[0] will yield undefined which
  // converts to the integer value 0.
  int exit_code = args[0]->Int32Value();
  exit(exit_code);
  return v8::Undefined();
}


v8::Handle<v8::Value> Version(const v8::Arguments& args) {
  return v8::String::New(v8::V8::GetVersion());
}

v8::Handle<v8::Value> Parameters(const v8::Arguments& args) {
  //v8::Handle<v8::FixedArray> paramsFixed = Factory::NewFixedArray(params.size());
  //for (int i = 0; i < params.size(); i++) {
  //  paramsFixed->set(i, params[i]);
  //}
  //return Factory::NewJSArrayWithElements(paramsFixed);
  if (params.length() > 0) {
    const char *p = params.c_str();
    return v8::String::New(p);
  } else return v8::String::New("");
}


// Reads a file into a v8 string.
v8::Handle<v8::String> ReadFile(const char* name) {
  FILE* file = fopen(name, "rb");
  if (file == NULL) return v8::Handle<v8::String>();

  fseek(file, 0, SEEK_END);
  int size = ftell(file);
  rewind(file);

  char* chars = new char[size + 1];
  chars[size] = '\0';
  for (int i = 0; i < size;) {
    int read = fread(&chars[i], 1, size - i, file);
    i += read;
  }
  fclose(file);
  v8::Handle<v8::String> result = v8::String::New(chars, size);
  delete[] chars;
  return result;
}


// The read-eval-execute loop of the shell.
void RunShell(v8::Handle<v8::Context> context) {
  printf("V8 version %s\n", v8::V8::GetVersion());
  static const int kBufferSize = 256;
  while (true) {
    char buffer[kBufferSize];
    printf("> ");
    char* str = fgets(buffer, kBufferSize, stdin);
    if (str == NULL) break;
    v8::HandleScope handle_scope;
    ExecuteString(v8::String::New(str), v8::Undefined(), true);
  }
  printf("\n");
}


// Executes a string within the current v8 context.
bool ExecuteString(v8::Handle<v8::String> source,
                   v8::Handle<v8::Value> name,
                   bool print_result) {
  v8::HandleScope handle_scope;
  v8::TryCatch try_catch;
  try_catch.SetVerbose(true);
  v8::Handle<v8::Script> script = v8::Script::Compile(source, name);
  if (script.IsEmpty()) {
    // Print errors that happened during compilation.
    v8::String::AsciiValue error(try_catch.Exception());
    printf("%s\n", *error);
    return false;
  } else {
    v8::Handle<v8::Value> result = script->Run();
    if (result.IsEmpty()) {
      // Print errors that happened during execution.
      v8::String::AsciiValue error(try_catch.Exception());
      printf("%s\n", *error);
      return false;
    } else {
      if (print_result && !result->IsUndefined()) {
        // If all went well and the result wasn't undefined then print
        // the returned value.
        v8::String::AsciiValue str(result);
        printf("%s\n", *str);
      }
      return true;
    }
  }
}
