var escape = require('escape-html');
const fs = require('fs');
let str = fs.readFileSync('musnad.txt').toString()
var bigcontent = escape(str)
fs.writeFileSync('escaped.txt', bigcontent);

