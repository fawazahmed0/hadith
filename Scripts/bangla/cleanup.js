

const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'compiled')
    let files = fs.readdirSync(mypath)

    for(let file of files){
        console.log(file)
        if(!file.includes('nasai.txt'))
        continue
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())
        arr = arr.map(e=>{
            try{
            return e.split(/\s{30,}/g)[0].split(' | ')[0].trim() +' | ' + e.split(/\s{30,}/g).slice(1).join(' ').trim()
            }catch(e){}
            return e
        })

        //console.log(file,arr.slice(0,10))
        fs.writeFileSync(filePath,arr.join('\n').trim())
    }
    

}
test()