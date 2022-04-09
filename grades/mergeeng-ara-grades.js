

const fs = require('fs');
const path = require('path');


async function test(){

    let engarr = fs.readFileSync(path.join(__dirname,'englistmap.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
    let araarr = fs.readFileSync(path.join(__dirname,'repetitivegrades.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
  let myjson = {}
    for(let i=0;i<engarr.length;i++){

      myjson[araarr[i].trim()] = engarr[i].trim()
    }

    fs.writeFileSync(path.join(__dirname,'engaramap.json'),JSON.stringify(myjson,null,4))
    

}
test()