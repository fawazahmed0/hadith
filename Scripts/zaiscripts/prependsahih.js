
const fs = require('fs/promises')
const path = require('path')
async function begin(){

    let pathToDir= path.join(__dirname, '..','zai')

    for(let file of (await fs.readdir(pathToDir))){
        let grades = await fs.readFile(path.join(pathToDir, file), {encoding:'utf8'})
        grades= JSON.parse(grades)

        for(let key of Object.keys(grades)){

            if(/^\s*Agreed Upon\s*$/i.test(grades[key]))
            grades[key] = `Sahih - `+grades[key].trim()
            else if(/(muslim|bukhari)/i.test(grades[key]) && !/sahih/i.test(grades[key]))
                grades[key] = `Sahih - `+grades[key].trim()
            

        }
    

    await fs.writeFile(path.join(pathToDir, file), JSON.stringify(grades, null, 4))
      
    }



}
begin()