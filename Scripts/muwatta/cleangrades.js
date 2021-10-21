const fs = require('fs');


let grades = fs.readFileSync('gradings2.txt').toString().split(/\r?\n/).map(e=>e.trim())

let strlist = fs.readFileSync('correctednums.txt').toString().split(/\r?\n/)

let reg = new RegExp('(\d+/\d+).*?('+grades.join('|')+')','gi')

for(let str of strlist){
    console.log(reg)
    break
}





// fs.writeFileSync('gradings23.txt',uniqgrades.join('\n'))