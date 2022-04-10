
const fs = require('fs');
const path = require('path')
async function test(){
    let books = {'abudawud':5274,'muslim':7563,'bukhari':7563,'malik':1858,'ibnmajah':4341,'nasai':5758,'tirmidhi':3956}
    let gradesJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'grades.json')).toString())
    let skeletonJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'skeleton.json')).toString())

    for(let book of Object.keys(books).sort()){
        for(let key of Object.keys(skeletonJSON["editions"][book]["hadiths"])){
            if(gradesJSON?.["editions"]?.[book]?.["hadiths"]?.[key])
        skeletonJSON["editions"][book]["hadiths"][key]["grades"] = gradesJSON["editions"][book]["hadiths"][key]["grades"]
        if(gradesJSON?.["editions"]?.[book]?.["hadiths"]?.[key]?.["bookref"])
        skeletonJSON["editions"][book]["hadiths"][key]["bookref"] = gradesJSON["editions"][book]["hadiths"][key]["bookref"]
        }
    }
    fs.writeFileSync(path.join(__dirname,'grades.json'),JSON.stringify(skeletonJSON,null,'\t'))
    }

    test()
 














