let path = require('path');
let fs = require('fs');



let filesArr  = []
async function test(){
    
    traverseDir(path.join(__dirname))
    
    for(let filePath of filesArr){
        if(!filePath.includes('compiled2') || !filePath.includes('turkish'))
        continue
       
            let str = fs.readFileSync(filePath).toString()
            let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem) && !/^\s*\d+\s*\|\s*$/.test(elem)).map(e=>e.trim())
            let num = 50
            for(let i=0;i<arr.length;i++){
                try{
                let prevVal = parseFloat( arr[i-1].match(/\d+\.?\d*/)[0] )
                let currentVal = parseFloat( arr[i].match(/\d+\.?\d*/)[0])
                let nextVal = parseFloat( arr[i+1].match(/\d+\.?\d*/)[0])

                if(Math.abs(prevVal - currentVal) > num && Math.abs(currentVal - nextVal) > num && nextVal-prevVal<num ){

                    arr[i] = ''
                }
                    
            }catch(e){}
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