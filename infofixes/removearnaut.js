
const fs = require('fs/promises')
const path = require('path')
async function begin(){

    let info = await fs.readFile(path.join(__dirname, 'info.json'),{encoding:'utf8'})
    info = JSON.parse(info)

   


    for(let bareEdition of Object.keys(info)){

        
        for(let i =0;i<info[bareEdition].hadiths.length;i++){

         
          try{

          let arnautArr =  info[bareEdition].hadiths[i].grades.filter(e=>e.name.toLowerCase().includes("arnaut"))[0].grade.toLowerCase().split(/\s+/)

          let othersGradesArr = info[bareEdition].hadiths[i].grades.filter(e=>!e.name.toLowerCase().includes("arnaut"))

          let othersArr =  othersGradesArr.map(e=>e.grade.toLowerCase().split(/\s+/)).flat()

          if(arnautArr.filter(e=>othersArr.includes(e)).length == 0)
          info[bareEdition].hadiths[i].grades = othersGradesArr

          }catch(e){}

        }
 
    

    }


    await fs.writeFile(path.join(__dirname, 'info.json'), JSON.stringify(info,null,'\t'))

}



begin()