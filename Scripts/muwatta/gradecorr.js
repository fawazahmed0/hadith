const fs = require('fs');


let str = fs.readFileSync('gradedeng.txt').toString()
let grades = fs.readFileSync('englishgrades.txt').toString()

let gradesjson = grades.split(/\r?\n/).map(e=>[e.split(' ')[0].trim(),e.split(' ').slice(1).join(' ').trim()])
gradesjson = Object.fromEntries(gradesjson)


for(let text of str.match(/Arabic.*?ref.*?Hadith\s+\d+/gi)){

   str=str.replace(text,text+'\nGrade: '+gradesjson[text.split(' ').slice(-1)[0]]) 
}

fs.writeFileSync('gradedengv3.txt',str)