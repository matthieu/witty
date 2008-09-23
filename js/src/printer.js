function toWyStr(elmt) {
  if (error(elmt)) return ('|' + elmt[3] + '|' + elmt[4] + '|' + elmt[5] + '| ' + elmt[1] + 
      (elmt[2] ? (': ' + elmt[2]) : ""));
  else return elmt;
}
