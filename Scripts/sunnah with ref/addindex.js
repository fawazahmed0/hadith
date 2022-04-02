// Remove repeated hadith numbers

const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'scrapped')
    let files = fs.readdirSync(mypath)

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        str = str.replace(/(^.*?)\r?\nReference.*?(\d+).*?\r?\n/mg,'$2 | $1')
        fs.writeFileSync(filePath,str)
    }
}
test()