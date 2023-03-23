let path = require('path');
let fs = require('fs');



let filesArr  = []
async function test(){
    
    traverseDir(path.join(__dirname))
    
    for(let filePath of filesArr){
        if( !filePath.includes('zai') || !filePath.includes('.grades.json'))
        continue
      
       
            let str = fs.readFileSync(filePath).toString()
            let arr = JSON.parse(str)

            let myarr = []
            for(let [key,val] of Object.entries(arr)){
                myarr.push({"newhadithno":key, "text":val})
          
            }
       
    
            arr = myarr

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
            newjson = {}
            for(let obj of arr){
                if(obj.text)
                newjson[obj.newhadithno] = obj.text
            }
    
 
            fs.writeFileSync(filePath,JSON.stringify(newjson,null,4))
        



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