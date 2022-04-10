// Remove repeated hadith numbers

const fs = require('fs');
const path = require('path');
// not working, will fix later

async function test(){

    let mypath =  path.join(__dirname,'compiled')
    let files = fs.readdirSync(mypath).filter(e=>e.includes('muslim'))

    for(let file of files){
      let filePath = path.join(mypath,file)
        let arr = fs.readFileSync(filePath).toString().split(/\r?\n/)
        let dotmap = fs.readFileSync(path.join(__dirname,'muslimmappingdot.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())
        let dotobj = {}
        for(let dotnum of dotmap){
            let[repeat, dot] = dotnum.split(' | ')
            dotobj[dot.trim()] = repeat.trim()
        }
        for(let i=0;i<arr.length;i++)
        {   
            try{
            let val = arr[i].match(/^\d+.?\d*\s+\|\s+/)[0]
            if(dotobj[val.replace(' | ','')])
            arr[i] =   arr[i].replace(val,dotobj[val.replace(' | ','')]+' | '+val)
            else
            arr[i] =   arr[i].replace(val,'9999999'+' | '+val)
            }catch(e){console.log(i)}

        }

        fs.writeFileSync(filePath,arr.join('\n').trim())
    }
}
test()