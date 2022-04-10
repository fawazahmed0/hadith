const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'hadith2')
    let files = fs.readdirSync(mypath).filter(e=>e.endsWith('muslimenglish.txt'))

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let myarr = str.matchAll(/^\s*Hadees Number\:\s*(\d+) \/ Arabic Hadees No\. (\d+)/mg)
        myarr = [...myarr].map(e=>[e[1],e[2]])
        let duplicates = myarr.map(e=>e[1]).filter((e, i, a) => a.indexOf(e) !== i) 
        for(let val of duplicates){
          let count = 1
          for(let i=0;i<myarr.length;i++){
            if(parseInt(myarr[i][1])==parseInt(val)){
              myarr[i][1] = parseInt(myarr[i][1]) +parseFloat(count*0.01)
              myarr[i][1] = myarr[i][1].toFixed(2)
              count++;
            }
          }

        }
        myarr.sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
        //console.log(myarr[2])
        //let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
        // arr.sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]))
        fs.writeFileSync(path.join(__dirname,'muslimmappingdot.txt'),myarr.map(e=>e[0]+' | '+e[1]).join('\n'))
    }
}
test()