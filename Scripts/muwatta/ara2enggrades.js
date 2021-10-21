const fs = require('fs');

let str = fs.readFileSync('arabicgrades.txt').toString()

let json = fs.readFileSync('gradingslistmap.json').toString()
json = JSON.parse(json)

let keys = Object.keys(json).sort((a,b)=>b.length-a.length)

for(let key of keys)
str=str.replaceAll(key,json[key])



fs.writeFileSync('englishgrades.txt',str)
   