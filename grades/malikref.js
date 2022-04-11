
const fs = require('fs');
const path = require('path')
async function test(){
    // 'muslim',
   let refFolders =  ['malik']

   for(let refval of refFolders){
    let str = fs.readFileSync(path.join(__dirname,'ref',refval+'reference.txt')).toString()
    let gradesJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'grades.json')).toString())


    let refArr = [...str.matchAll(/Arabic reference.*?(\d+).*?(\d+).*?\r?\n/mg)]
  

    for(let ref of refArr){
        

        if(gradesJSON?.["editions"]?.[refval]?.['hadiths']?.[ref[2]])
        gradesJSON["editions"][refval]['hadiths'][ref[2]]['bookref'] = {"book":parseFloat(ref[1]),"hadith":parseFloat(ref[2])}
  
        
        
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

    













