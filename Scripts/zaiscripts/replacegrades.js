
const fs = require('fs/promises')
const path = require('path')
async function begin(){

    let pathToDir= path.join(__dirname, '..','zai')
    let zaigrades = await fs.readFile(path.join(__dirname, 'zaigrades.json'), {encoding:'utf8'})
    zaigrades= JSON.parse(zaigrades)
    for(let file of (await fs.readdir(pathToDir))){
        let grades = await fs.readFile(path.join(pathToDir, file), {encoding:'utf8'})
        grades= JSON.parse(grades)

        for(let aragrade of Object.keys(zaigrades)){
        for(let key of Object.keys(grades)){
            grades[key] = grades[key].replaceAll(aragrade,zaigrades[aragrade] )
        }
    }

    await fs.writeFile(path.join(pathToDir, file), JSON.stringify(grades, null, 4))
      
    }



}
begin()