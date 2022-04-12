var util = require('./../utilities.js');
var path = require('path');

async function test(){
  let gradesJSON =  await util.getJSON(path.join(__dirname,'grades.json'))
    for(let [key, value] of Object.entries(gradesJSON)){
        gradesJSON[key]["metadata"]["hadith_count"] =  Object.keys(gradesJSON[key]["hadiths"]).length
        if(gradesJSON[key]["metadata"]["sections"])
        gradesJSON[key]["metadata"]["has_sections"] = true
    }


  util.saveJSON(gradesJSON, path.join(__dirname,'grades.json'), '\t')


}

test()