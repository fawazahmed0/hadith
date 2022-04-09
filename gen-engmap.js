

const fs = require('fs');
const path = require('path');


async function test(){

    let maparr = fs.readFileSync(path.join(__dirname,'mappedeng-ara.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
    let araarr = fs.readFileSync(path.join(__dirname,'repetitivegrades.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))


let mapobj = {}

for(let j=0;j<maparr.length;j++){
  mapobj[maparr[j].split(' | ')[1].trim()] = maparr[j].split(' | ')[0].trim()
}
console.log(mapobj)

    for(let i=0;i<araarr.length;i++){

      araarr[i] = mapobj[araarr[i].trim()] ? mapobj[araarr[i].trim()] : araarr[i].trim()

  


    }

    fs.writeFileSync(path.join(__dirname,'englistmap.txt'),araarr.join('\n').trim())
    

}
test()