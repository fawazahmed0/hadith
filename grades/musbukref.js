
const fs = require('fs');
const path = require('path')
async function test(){
    // 'muslim',
   let refFolders =  ['muslim']

   for(let refval of refFolders){
    let str = fs.readFileSync(path.join(__dirname,'ref',refval+'reference.txt')).toString()
    let gradesJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'grades.json')).toString())

    let mapJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'..','Scripts','dotmappingmerged.json')).toString())

    let refArr = [...str.matchAll(/(\d+[a-z]?)In\-book\s*reference\s*\:\s*Book\s*(\d+)\,\s*hadith\s*(\d+)/ig)]
  

    for(let ref of refArr){
        
        let num = getKeyByValue(mapJSON, alpha2num(ref[1]))
        //console.log('num is ',num,'alpha is ',ref[1],'alpha2num is',alpha2num(ref[1]))
        if(gradesJSON?.["editions"]?.[refval]?.['hadiths']?.[num]){
        gradesJSON["editions"][refval]['hadiths'][num]['bookref'] = {"book":parseFloat(ref[2]),"hadith":parseFloat(ref[3])}
        if(mapJSON[num])
        gradesJSON["editions"][refval]['hadiths'][num]['arabicnumber'] = mapJSON[num]
        else{
        gradesJSON["editions"][refval]['hadiths'][num]['arabicnumber'] = ''
            console.log('undeinfed')
    }
        }
        
    }

    fs.writeFileSync(path.join(__dirname,'grades.json'),JSON.stringify(gradesJSON,null,'\t'))





   }





    }

    test()
 
    function alpha2num(str){
        let val =  str.match(/(\d+)([a-z])/)
         if(val)
             return val[1] +'.' + (val[2].charCodeAt(0)-96).toString().padStart(2,'0')
             return str.toString()
      }
      
      function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] == value);
      }

    













