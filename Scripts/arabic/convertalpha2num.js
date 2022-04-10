// Remove repeated hadith numbers

const fs = require('fs');
const path = require('path');
// not working, will fix later

async function test(){

    let mypath =  path.join(__dirname,'compiled')
    let files = fs.readdirSync(mypath).filter(e=>e.includes('muslim'))

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let no  = 97
    
        for (var i = no; i <= no+26; i++) {
            let reg = new RegExp('(^\\d+)'+String.fromCharCode(i)+' (\|)','gm')
            str = str.replace(reg,'$1.'+(i-no+1).toString().padStart(2, '0')+' $2')
        }
        fs.writeFileSync(filePath,str)
    }
}
test()