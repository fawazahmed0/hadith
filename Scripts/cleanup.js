let path = require('path');
let fs = require('fs');



let filesArr  = []
async function test(){
    
    traverseDir(path.join(__dirname))
    
    for(let filePath of filesArr){

        if(!filePath.includes('turkish') || !filePath.includes('compiled'))
            continue
            let str = fs.readFileSync(filePath).toString()
            let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())

            for(let i=0;i<arr.length;i++){
                arr[i] = arr[i].replace(/(\d+.?\d*\s+\|\s+)\d+\-\)/mg, '$1')
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