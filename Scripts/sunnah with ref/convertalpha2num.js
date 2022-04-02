// Remove repeated hadith numbers

const fs = require('fs');
const path = require('path');
// not working, will fix later

async function test(){

    let mypath =  path.join(__dirname,'scrapped')
    let files = fs.readdirSync(mypath)

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let no  = 97
    
        for (var i = no; i <= no+26; i++) {
            let reg = new RegExp('(\\d+)'+String.fromCharCode(i)+' (\|)','g')
            str = str.replace(reg,'\n$1.'+(i-no+1)+' $2')
        }
        fs.writeFileSync(filePath,str)
    }
}
test()