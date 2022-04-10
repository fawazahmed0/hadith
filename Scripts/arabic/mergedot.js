// Remove repeated hadith numbers

const fs = require('fs');
const path = require('path');
// not working, will fix later

async function test(){

 let mapobj = {}
   let dotone = fs.readFileSync(path.join(__dirname,'muslimmappingdot.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())
    let dottwo = fs.readFileSync(path.join(__dirname,'dotmapping.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())

    for(let dotnum of dotone){
        let[repeat, dot] = dotnum.split(' | ')
        mapobj[repeat.trim()] = dot.trim()
    }

    for(let dotnum of dottwo){
        let[repeat, dot] = dotnum.split(' | ')
        mapobj[repeat.trim()] = dot.trim()
    }

    fs.writeFileSync('dotmappingmerged.json',JSON.stringify(mapobj,null,'\t'))



}
test()