const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'hadithfiles')
    let files = fs.readdirSync(mypath)

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
        arr.sort((a, b) => (parseInt(a.split('|')[0].trim()) - parseInt(b.split('|')[0].trim())))
        fs.writeFileSync(filePath,arr.join('\n').trim())
    }
}
test()