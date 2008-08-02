Array.prototype.isEmpty = function() {
  return this.length == 0;
};
Array.prototype.first = function() {
  if (this.length == 0) return null;
  else return this[0];
};
Array.prototype.tail = function() {
  if (this.length < 2) return [];
  return this.slice(1);
};
Array.prototype.tailAtom = function() {
  if (this.length == 2) return this[1];
  if (this.length < 2) return [];
  return this.slice(1);
};
Array.prototype.last = function() { return this[this.length-1]; }
Array.prototype.pushAll = function(arr) {
  for (var m = 0; m < arr.length; m++)
    this.push(arr[m]);
}
Array.prototype.reduceFirst = function(fn) {
  var acc = this[0], res = acc;
  for (var m = 1, el; (el = this[m]) || el == 0; m++) res = fn(acc, el);
  return res;
}; 
Array.prototype.indexOf = function(value) {
  for (var m = 0, el; (el = this[m]) || el == 0; m++) 
    if (value.valueOf() == el.valueOf()) return m;
  return null;
}
Array.prototype.truthyLength = function(value) {
  var len = 0;
  for (var m = 0; m < this.length; m++)
    if (this[m] || this[m] == 0) len++;
  return len;
}

Object.prototype.keys = function() { 
  var res = [];
  for (var p in this) { if (this.hasOwnProperty(p)) res.push(p); };
  return res;
}
Object.prototype.eachPair = function(fn) { 
  for (var p in this) { if (this.hasOwnProperty(p)) fn(p, this[p]); };
}
Object.prototype.clone = function() {
  function middleMan() { };
  middleMan.prototype = this;
  return new middleMan();
}
