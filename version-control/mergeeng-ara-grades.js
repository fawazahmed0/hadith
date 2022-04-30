

const fs = require('fs');
const path = require('path');


async function test(){

    let engarr = fs.readFileSync(path.join(__dirname,'englistmap.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
    let araarr = fs.readFileSync(path.join(__dirname,'repetitivegrades.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
  let myarr = []
    for(let i=0;i<engarr.length;i++){

      myarr.push(engarr[i]+' | '+araarr[i])
    }

    fs.writeFileSync(path.join(__dirname,'mappedeng-ara.txt'),myarr.join('\n').trim())
    

}
test()