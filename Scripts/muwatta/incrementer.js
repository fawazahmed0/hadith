const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname,'..','sunnah with ref','scrapped','malikarabicscrapped.txt')
let str = fs.readFileSync(filePath).toString()
let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())
let bool = false
for(let i=0 ;i<arr.length;i++){
    let num = 29
    let offset = 1
    if(arr[i].includes(num+' | '))
    bool=true

    if(bool)
        arr[i]= (arr[i].split(' | ')[0]-offset)+' | '+arr[i].split(' | ')[1]
        
    
       

}

fs.writeFileSync(filePath,arr.join('\n').trim())