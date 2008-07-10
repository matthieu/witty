Array.prototype.isEmpty = function() {
  return this.length == 0;
};
Array.prototype.first = function() {
  if (this.length == 0) return null;
  else return this[0];
};
Array.prototype.last = function() {
  return this[this.length-1];
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
Array.prototype.reduceFirst = function(fn) {
  var acc = this[0], res = acc;
  for (var m = 1, el; el = this[m]; m++) res = fn(acc, el);
  return res;
}; 
Array.prototype.indexOf = function(value) {
  for (var m = 0, el; el = this[m]; m++) 
    if (value == el) return m;
  return null;
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
