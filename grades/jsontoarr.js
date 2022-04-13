const fs = require('fs')
const path = require('path')

async function test(){
    let gradesJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'grades.json')).toString())
    for(let [key,value] of Object.entries(gradesJSON)){
        gradesJSON[key]["hadiths"] = Object.values(gradesJSON[key]["hadiths"])
    }
    fs.writeFileSync(path.join(__dirname,'grades.json'),JSON.stringify(gradesJSON,null,'\t'))


}
test()