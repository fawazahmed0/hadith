const fs = require('fs/promises')
const path = require('path')
async function begin(){

    let freshDir = path.join(__dirname, 'fresh')
    let oldDir = path.join(__dirname, 'old')

    for(let file of (await fs.readdir(freshDir))){
       let freshFile =  await fs.readFile(path.join(freshDir, file), {encoding:'utf8'})
       freshFile = JSON.parse(freshFile)

       let oldFile =  await fs.readFile(path.join(oldDir, file), {encoding:'utf8'})
       oldFile = JSON.parse(oldFile)

       //let freshHadithNumbers = freshFile.hadiths.map(e=>e.hadithnumber)

       //let oldHadithNumbers = oldFile.hadiths.map(e=>e.hadithnumber)
       //let uniqueoldHadithNumbers = oldHadithNumbers.filter(e=>!freshHadithNumbers.includes(e))

       let obj = {}
       oldFile.hadiths.map(e=>obj[e.hadithnumber]=e.text)
       freshFile.hadiths.map(e=>obj[e.hadithnumber]=e.text)

       
        await fs.writeFile(path.join(__dirname, file.replace(/\.json$/,'.txt')), Object.entries(obj).filter(e=>e[0]!=""&&e[1]!="").map(e=>e.join(' | ')).join('\n'))


    }

}
begin()