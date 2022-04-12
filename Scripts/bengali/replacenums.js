const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'compiled')
    let files = fs.readdirSync(mypath)

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())
        for(let i=0;i<arr.length;i++){
            arr[i] = arr[i].split('|')[0].trim() + ' | ' + arr[i].split('|').slice(1).join(' ').replace(/^\s?[০-৯]+\./mg,"").trim()
        }
        fs.writeFileSync(filePath,arr.join('\n').trim())
    }
}
test()