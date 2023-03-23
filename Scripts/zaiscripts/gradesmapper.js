
const fs = require('fs/promises')
const path = require('path')
async function begin(){

    let pathToDir= path.join(__dirname, '..','zai')
    let bigarr = []
    for(let file of (await fs.readdir(pathToDir))){
        let grades = await fs.readFile(path.join(pathToDir, file), {encoding:'utf8'})
        grades= JSON.parse(grades)
        bigarr.push( Object.values(grades) )
    }

    let values = bigarr.flat().join(' ').split(/\p{Z}/gui)
    values = [...new Set(values)].filter(e=>!/\(?\d+.?\)?$/.test(e)).sort((a, b) =>   b.length-a.length)
    let json = {}
    values.map(e=>json[e]="")
    console.log(values.length, values)
    await fs.writeFile(path.join(__dirname,'zaigrades.json'), JSON.stringify(json, null, 4))


}
begin()