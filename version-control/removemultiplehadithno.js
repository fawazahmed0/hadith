// Remove repeated hadith numbers

const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'hadithfiles')
    let files = fs.readdirSync(mypath)

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let arr  = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
        for(let i=1;i<arr.length;i++){
            for(let j=i+1;j<i+10;j++){
            try{
            if(arr[j].match(/\d+\s+\|/)[0]==arr[i].match(/\d+\s+\|/)[0])
                arr[j] = ''
            else
            break
            }catch(e){}
        }
        }
        fs.writeFileSync(filePath,arr.filter(elem => !/^\s*$/.test(elem)).join('\n').trim())
    }
}
test()