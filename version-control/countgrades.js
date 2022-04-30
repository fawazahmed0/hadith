

const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'hadithfiles')
    let files = fs.readdirSync(mypath)
    let storear = []
    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.replace(/\d+\s*\|\s*/,' ').trim())

        const counts = {};
        arr.forEach(x=>  counts[x] = (counts[x] || 0) + 1 );


       let bigarr =  Object.entries(counts).sort((a, b) => ( b[1]-a[1]))
        //console.log(bigarr.slice(0,20))
       storear= storear.concat(bigarr.slice(0,20).map(e=>e[0]))
       
    }
    
    storear = storear.filter(e=>e.length<30)
    storear= [...new Set(storear)]
    storear.sort((a, b) => b.length - a.length)
    fs.writeFileSync(path.join(__dirname,'repetitivegrades.txt'),storear.join('\n').trim())
}
test()