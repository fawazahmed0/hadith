var a = require('./../utilities.js');
var path = require('path');
a.getJSON(path.join(__dirname,'grades.json')).then(console.log)