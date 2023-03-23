let path = require('path');
let fs = require('fs');

// Fix numbering, advanced version for json

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
        
        
      //  for(let [key,value] of Object.entries(lasthadithObj)){
      //      if(filePath.includes(key)){
      //          if(arr.slice(-1)[0].match(/\d+\.?\d*/)[0] !=value){
      /*              console.log("wrong last hadith no with "+filePath)
                    continue
                }

            }

        }
        */


            for(let i=arr.length;i>0;i--){
                let diff,refVal,nextRefVal;
                try{
             
                    
                refVal = parseFloat( arr[i].newhadithno)
                nextRefVal = parseFloat( arr[i-1].newhadithno)
                diff = refVal - nextRefVal
                }catch(e){continue}
                let countJ = 0
                for(let j=i-2;j>i-20 && diff==1 ;j--){
                    try{
                        let currentVal = parseFloat( arr[j].newhadithno)
                        let confirm = false
                        let countK = -1;
                        // previous values for confirmation
                        for(let k=j-1;k>j-20;k--){
                            let prevVal = parseFloat( arr[k].newhadithno)
                            countK++;
                            if(refVal-prevVal==countK+countJ+3){
                                confirm = true
                                break
                            }
                        }

                        if(Math.abs(refVal-currentVal)>15+countJ && confirm){
                            let newVal = refVal - (countJ + 2)
                            arr[j].newhadithno = newVal
                        }

                    
                    
                    }catch(e){}
                    countJ++
                }
               
            }
            newjson = {}
            for(let obj of arr){
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