
const fs = require('fs');
const path = require('path')
async function test(){
    // 'muslim',
   let refFolders =  ['bukhari']

   for(let refval of refFolders){
    let str = fs.readFileSync(path.join(__dirname,'ref',refval+'reference.txt')).toString()
    let gradesJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'grades.json')).toString())

    let refArr = [...str.matchAll(/(\d+)In\-book\s*reference\s*\:\s*Book\s*(\d+)\,\s*hadith\s*(\d+)/ig)]
  

    for(let ref of refArr){
        if(gradesJSON?.["editions"]?.[refval]?.['hadiths']?.[ref[1]])
        gradesJSON["editions"][refval]['hadiths'][ref[1]]['bookref'] = {"book":parseFloat(ref[2]),"hadith":parseFloat(ref[3])}
        
    }

    fs.writeFileSync(path.join(__dirname,'grades.json'),JSON.stringify(gradesJSON,null,'\t'))





   }





    }

    test()
 














