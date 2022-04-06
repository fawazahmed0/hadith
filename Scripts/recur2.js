let path = require('path');
let fs = require('fs');



let filesArr  = []
async function test(){
    
    traverseDir(path.join(__dirname))
    
    for(let filePath of filesArr){
        if(!filePath.includes('compiled'))
            continue

            let str = fs.readFileSync(filePath).toString()
            let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.split(/\s+\|\s+/))
            for(let i=0;i<arr.length;i++){

                if(Math.abs(arr[i][0]-arr[i+1][0])>5 && (Math.abs(arr[i][0]-arr[i+2][0])==2 || Math.abs(arr[i][0]-arr[i+2][0])==0.1)){
                    arr[i+1][0] = (arr[i][0]+arr[i+2][0])/2
                }


            }
            fs.writeFileSync(filePath,arr.map(e=>e[0]+' | '+e.slice(1).join(' ')).join('\n').trim())

    }
}