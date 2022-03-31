const fs = require('fs');
const path = require('path');
var vm = require("vm")
async function test(){

    let mypath =  path.join('E:\\', 'hadith','alizai')
    let folders = fs.readdirSync(mypath).filter(e=>e!='fetc.js')

    for(let folder of folders){
        let files = fs.readdirSync(path.join(mypath,folder))
        let sortedFiles = files.map(e=>parseInt(e.split('.')[0])).sort((a, b) => (a - b))
        let arr = []
        for(let fileno of sortedFiles){
            let str = fs.readFileSync(path.join(mypath,folder,fileno+'.js')).toString()
            eval(str.replace('var',''))
            let grade = global[folder].hukam || global[folder].description || ''
            arr.push(fileno+' | '+grade.replace('\n',' '))
        }
        fs.writeFileSync(path.join(__dirname,folder+'gradings.txt'),arr.join('\n'))
       
    }
}
test()