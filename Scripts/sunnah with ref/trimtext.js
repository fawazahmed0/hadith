

const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'scrapped')
    let files = fs.readdirSync(mypath)

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString() .replace(/(\d+ \|)\s+\,\s?/g,'$1 ')
        let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())

        //console.log(file,arr.slice(0,10))
        fs.writeFileSync(filePath,arr.join('\n').trim())
    }
    

}
test()