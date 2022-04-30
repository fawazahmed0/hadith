

const fs = require('fs');
const path = require('path');


async function test(){

    let mypath =  path.join(__dirname,'hadithfiles')
    let files = fs.readdirSync(mypath)

    for(let file of files){
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.split(' | '))
        let gradesarr = fs.readFileSync(path.join(__dirname,'repetitivegrades.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))

        for(let i=0;i<arr.length;i++){
            if(arr[i].length>2)
            console.log('issue')
            if(!gradesarr.includes(arr[i][1])){
                console.log(file,arr[i][0],arr[i][1])
            arr[i][1] = ''
            }
        }
        arr = arr.filter(e=>e[1]!='')
        //console.log(file,arr.slice(0,10))
        fs.writeFileSync(filePath,arr.map(e=>e.join(' | ')).join('\n').trim())
    }
    

}
test()