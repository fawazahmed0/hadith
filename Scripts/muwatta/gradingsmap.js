const fs = require('fs');


let str = fs.readFileSync('gradingslistmap.txt').toString()



let grades = str.split(/\r?\n/gi).map(e=>e.split(',').map(e=>e.trim()))



fs.writeFileSync('gradingslistmap.json',JSON.stringify(Object.fromEntries(grades)))