let path = require('path');
let fs = require('fs');

// Fix numbering, advanced version

let filesArr  = []

let lasthadithObj = {bukhari :7563,abudawud: 5274,

    tirmidhi: 3956,nasai: 5758,
    
    muslim: 3033.2,malik: 1858,
    ibnmajah: 4341}

async function test(){

    let booknames = Object.keys(lasthadithObj)
    
    traverseDir(path.join(__dirname))
    
    for(let filePath of filesArr){

        if(!filePath.includes('compiled') || !filePath.includes('turkish'))
        continue
        let bookval = ''
        for(let book of booknames){
            if(filePath.includes(book)){
                bookval = book
                break
            }
            
        }

        let language = fs.readdirSync(path.join(__dirname)).filter(elem => filePath.includes(elem))[0]


        let myobj = {"author":"","book":bookval,language:language}

        let str = fs.readFileSync(filePath).toString()
        //let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())
        str=str+'\n'+JSON.stringify(myobj,null,'\t')
      //  for(let [key,value] of Object.entries(lasthadithObj)){
      //      if(filePath.includes(key)){
      //          if(arr.slice(-1)[0].match(/\d+\.?\d*/)[0] !=value){
      /*              console.log("wrong last hadith no with "+filePath)
                    continue
                }

            }

        }
        */

            fs.copyFileSync(filePath,path.join(__dirname,'..','..','hadith-api' , 'start',language+path.basename(filePath)))
          //  fs.writeFileSync(filePath,str)
        



    }

}
test()


function traverseDir(dir) {
 
    fs.readdirSync(dir).forEach(file => {
      let fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
         //console.log(fullPath);
         traverseDir(fullPath);
       } else {
        filesArr.push(fullPath);
       }  
    });
    return filesArr
  }