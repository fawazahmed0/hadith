const fs = require('fs/promises')
const path = require('path')
const papa = require("papaparse");
async function begin(){

  
    let filesPath = path.join(__dirname, 'files')
    for(let file of (await fs.readdir(filesPath)) ){
        let arr = []
        let data = await fs.readFile(path.join(filesPath, file), {encoding:'utf8'})
        data = JSON.parse(data)

        for(let hadith of data.hadiths){
         let json = hadith
         json.book = hadith.reference.book
         json.hadith = hadith.reference.hadith

        let gradesJSON = {}
        hadith.grades.map(e=>{
            gradesJSON[e['name']] = e['grade']
         })
  

         json = {...json, ...gradesJSON }

         delete json["grades"]
         delete json["reference"]
   

         arr.push(json)
        }

        await fs.writeFile(path.join(__dirname, 'csv', file.replace('.json','.csv')), papa.unparse(arr))

        

    }

}
begin()