let path = require('path');
let fs = require('fs');



let filesArr  = []

let lasthadithObj = {bukhari :7563,abudawud: 5274,

    tirmidhi: 3956,nasai: 5758,
    
    muslim: 3033.2,malik: 1858,
    ibnmajah: 4341}

async function test(){
    
    traverseDir(path.join(__dirname))
    
    for(let filePath of filesArr){

        if(!filePath.includes('compiled'))
        continue

        let str = fs.readFileSync(filePath).toString()
        let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())

        for(let [key,value] of Object.entries(lasthadithObj)){
            if(filePath.includes(key)){
                if(arr.slice(-1)[0].match(/\d+/)[0] !=value){
                    console.log("wrong last hadith no with "+filePath)
                    continue
                }

            }

        }



            for(let i=arr.length;i>0;i--){
                let diff,refVal,nextRefVal;
                try{
                refVal = parseFloat( arr[i].match(/\d+\.?\d*/)[0])
                nextRefVal = parseFloat( arr[i-1].match(/\d+\.?\d*/)[0])
                diff = refVal - nextRefVal
                }catch(e){continue}
                for(let j=i-2;j>i-10 && diff==1 ;j--){
                    try{
                        let currentVal = parseFloat( arr[j].match(/\d+\.?\d*/)[0])
                        if(refVal-currentVal>10+j-i+2){
                            let newVal = refVal - i-j
                            arr[j] = newVal + arr[j].replace(/\d+\.?\d*/,'')
                        }

                    
                    
                    }catch(e){}

                }
               
            }
            fs.writeFileSync(filePath,arr.join('\n').trim())
        



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