var stdin = new java.io.BufferedReader(new java.io.InputStreamReader(java.lang.System['in']));
function readline() {
  return stdin.readLine();
}

function readfile(f) {
  var reader = new java.io.BufferedReader(new java.io.FileReader(f));
  var txt = '', line;
  while (line = reader.readLine()) txt = txt + line + '\n';
  return txt;
}

function pr(str) {
  java.lang.System.out.print(str);
}
