const fs = require('fs');


let str = fs.readFileSync('arabicgrades.txt').toString()



let grades = str.split(/\r?\n/gi).map(e=>e.replace(/\d+/,"").trim())

let uniqgrades = [...new Set(grades)];

fs.writeFileSync('gradingslist.txt',uniqgrades.join('\n'))