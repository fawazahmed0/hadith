const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'hadith2')
    let files = fs.readdirSync(mypath).filter(e=>e.endsWith('muslimenglish.txt'))

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let myarr = str.matchAll(/^\s*Hadees Number\:\s*(\d+) \/ Arabic Hadees No\. (\d+)/mg)
        myarr = [...myarr].map(e=>({hadithNo:e[1],arabicNo:e[2]}))
        //console.log(myarr[2])
        //let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
        // arr.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
        fs.writeFileSync(path.join(__dirname,'muslimmapping.json'),JSON.stringify(myarr, null, 4))
    }
}
test()