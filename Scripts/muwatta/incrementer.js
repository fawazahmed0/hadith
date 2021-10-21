const fs = require('fs');


let str = fs.readFileSync('incrementer.txt').toString()
let bool = false
for(let text of str.match(/Arabic ref.*?Hadith\s+\d+/gi)){

    if(text.includes('Hadith 295'))
    bool=true

    if(bool){
       let num= text.split(' ').slice(-1)[0]-2
        str = str.replace(text,text.split(' ').slice(0,-1).join(' ')+' '+num)
    }
       

}

fs.writeFileSync('incrementer2.txt',str)