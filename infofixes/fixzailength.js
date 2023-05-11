
const fs = require('fs/promises')
const path = require('path')
async function begin(){

    let info = await fs.readFile(path.join(__dirname, 'info.json'),{encoding:'utf8'})
    info = JSON.parse(info)

    let arr = []

    for(let bareEdition of Object.keys(info)){
  
        for(let i =0;i<info[bareEdition].hadiths.length;i++){

            try{
                

                arr.push(info[bareEdition].hadiths[i].grades.filter(e=>/Zubair Ali Zai/i.test(e.name))[0].grade.replace(/\d+/gi, ''))
            }catch(e){continue}

        

            
        }


    }

    console.log([...new Set(arr)])
   // await fs.writeFile(path.join(__dirname, 'info.json'), JSON.stringify(info,null,'\t'))

}

begin()