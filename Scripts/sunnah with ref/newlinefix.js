const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'scrapped')
    let files = fs.readdirSync(mypath)

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        str = str.replace(/\r?\n/g,'')
        str = str.replace(/(\d+\.?\d+)\s+\|\s+/g,'\n$1 | ')
        fs.writeFileSync(filePath,str.trim())
    }
}
test()