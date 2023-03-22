let path = require('path');
let fs = require('fs');



let filesArr  = []
async function test(){
    
    traverseDir(path.join(__dirname))
    
    for(let filePath of filesArr){
        if(!filePath.includes('jsonnew') || !filePath.includes('.json') )
        continue
       
            let str = fs.readFileSync(filePath).toString()
            let arr = JSON.parse(str)
            let num = 50
            for(let i=0;i<arr.length;i++){
                try{
                let prevVal = parseFloat( arr[i-1].newhadithno )
                let currentVal = parseFloat( arr[i].newhadithno)
                let nextVal = parseFloat( arr[i+1].newhadithno)

                if(Math.abs(prevVal - currentVal) > num && Math.abs(currentVal - nextVal) > num && nextVal-prevVal<num ){

                    arr[i] = {}
                }
                    
            }catch(e){}
            }
            fs.writeFileSync(filePath,JSON.stringify(arr.filter(e=>Object.keys(e).length!=0),null,4))
        



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