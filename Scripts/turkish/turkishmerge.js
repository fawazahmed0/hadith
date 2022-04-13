const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'compiled')
    let newpath =  path.join(__dirname,'newly')
    let files = fs.readdirSync(mypath)

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let newstr = fs.readFileSync(path.join(newpath,file)).toString()
        let arr1 = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
        let arr2 = newstr.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
        let mergeArr = [...arr2,...arr1]
        uniqArr = [...new Set(mergeArr)];
        uniqArr = uniqArr.filter(e=>!/^\d+\.\d+\s*\|/.test(e))
        uniqArr.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
        fs.writeFileSync(filePath,uniqArr.join('\n').trim())

    }
}
test()