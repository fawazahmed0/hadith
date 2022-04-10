let path = require('path');
let fs = require('fs');



let filesArr  = []
async function test(){
    
    traverseDir(path.join(__dirname))
    
    for(let filePath of filesArr){

        if( !filePath.includes('newly'))
            continue
            let str = fs.readFileSync(filePath).toString()
            let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())
            arr.sort((a, b) => parseFloat(a.match(/\d+\.?\d*/)[0]) - parseFloat(b.match(/\d+\.?\d*/)[0]))
            let duplicates = arr.map(e=>e.match(/\d+\.?\d*/)[0]).filter((e, i, a) => a.indexOf(e) !== i)
            for(let i=0;i<arr.length;i++){
                if(duplicates.includes(arr[i].match(/\d+\.?\d*/)[0]))
                arr[i] = ''
            }
            fs.writeFileSync(filePath,arr.filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim()).join('\n').trim())
        



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