
const fs = require('fs/promises')
const path = require('path')
async function begin(){

    let info = await fs.readFile(path.join(__dirname, 'info.json'),{encoding:'utf8'})
    info = JSON.parse(info)

    for(let bareEdition of Object.keys(info)){
        let newgrades
        try{
         newgrades = await fs.readFile(path.join(__dirname, '..','Scripts','zai',`${bareEdition}.grades.json`),{encoding:'utf8'})
        newgrades = JSON.parse(newgrades)
        }catch(e){continue}
        for(let i =0;i<info[bareEdition].hadiths.length;i++){

            info[bareEdition].hadiths[i].grades = info[bareEdition].hadiths[i].grades.filter(e=>!/Zubair Ali Zai/i.test(e.name))
            let gradevalue = newgrades[info[bareEdition].hadiths[i].hadithnumber]
            if(gradevalue)
            info[bareEdition].hadiths[i].grades = info[bareEdition].hadiths[i].grades.concat([{"name": "Zubair Ali Zai","grade":gradevalue}])

            
        }


    }

    await fs.writeFile(path.join(__dirname, 'info.json'), JSON.stringify(info,null,'\t'))

}

begin()