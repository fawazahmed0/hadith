const fs = require('fs');
const path = require('path');

async function test(){
    let mypath =  path.join(__dirname,'booknames')
    let files = fs.readdirSync(mypath)
    let gradesJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'grades.json')).toString())
    let hadithbooksJSON = {"bukhari":"Sahih al Bukhari","muslim":"Sahih Muslim","nasai":"Sunan an Nasai","abudawud":"Sunan Abu Dawud","tirmidhi":"Jami At Tirmidhi","ibnmajah":"Sunan Ibn Majah","malik":"Muwatta Malik"}
    for(let file of files){
        let filePath = path.join(mypath, file)
        let bookJSON = JSON.parse(fs.readFileSync(filePath).toString())
        let newbookJSON = {}
        for(let [key,value] of Object.entries(bookJSON))
            newbookJSON[parseFloat(key)] = value
        let editionName = file.replace('booksnames.json','').trim()
        gradesJSON["editions"][editionName]["metadata"] = {}
        gradesJSON["editions"][editionName]["metadata"]["name"] =hadithbooksJSON[editionName]
        gradesJSON["editions"][editionName]["metadata"]["booknames"] = newbookJSON


    }

    fs.writeFileSync(path.join(__dirname,'grades.json'),JSON.stringify(gradesJSON,null,'\t'))

}
test()