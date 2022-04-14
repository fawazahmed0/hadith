
const fs = require('fs');
const path = require('path')
async function test(){
    let gradesPath = path.join(__dirname,'..','..','hadith-api','info.json')
    let gradesJSON = JSON.parse(fs.readFileSync(gradesPath).toString())
    let bookname = 'muslim'
    for(let i=0;i<gradesJSON[bookname]['hadiths'].length;i++){
        if(gradesJSON[bookname]['hadiths'][i]["hadithnumber"] == gradesJSON[bookname]['hadiths'][i]["arabicnumber"])
        gradesJSON[bookname]['hadiths'][i]["arabicnumber"] = 0
        /*
        if(!gradesJSON[bookname]['hadiths'][i]["reference"] && gradesJSON[bookname]['hadiths'][i]["hadithnumber"]<93){
            gradesJSON[bookname]['hadiths'][i]["reference"] = {}
            gradesJSON[bookname]['hadiths'][i]["reference"]["book"] = 0
            gradesJSON[bookname]['hadiths'][i]["reference"]["hadith"] = gradesJSON[bookname]['hadiths'][i]["hadithnumber"]
        }
        */
    }



    fs.writeFileSync(gradesPath,JSON.stringify(gradesJSON,null,'\t'))
    }

    test()
 














