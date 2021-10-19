var escape = require('escape-html');
const fs = require('fs');
fs.writeFileSync('bigstring.txt', bigcontent);
var bigcontent = escape(`paste big content here`)
