
const fs = require('fs');
const path = require('path')
async function test(){
    let gradesPath = path.join(__dirname,'..','..','hadith-api','info.json')
    let gradesJSON = JSON.parse(fs.readFileSync(gradesPath).toString())

    for(let i=0;i<gradesJSON['ibnmajah']['hadiths'].length;i++){
        if(!gradesJSON['ibnmajah']['hadiths'][i]["reference"] && gradesJSON['ibnmajah']['hadiths'][i]["hadithnumber"]<300){
            gradesJSON['ibnmajah']['hadiths'][i]["reference"] = {}
            gradesJSON['ibnmajah']['hadiths'][i]["reference"]["book"] = 0
            gradesJSON['ibnmajah']['hadiths'][i]["reference"]["hadith"] = gradesJSON['ibnmajah']['hadiths'][i]["hadithnumber"]
        }
    }



    fs.writeFileSync(gradesPath,JSON.stringify(gradesJSON,null,'\t'))
    }

    test()
 














