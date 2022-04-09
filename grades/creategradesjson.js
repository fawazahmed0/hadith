const fs = require('fs');
const path = require('path');


async function test(){
    let myjson = {"editions":{}}
    let mapjson = JSON.parse(fs.readFileSync(path.join(__dirname,'engaramap.json')).toString())
    let mypath =  path.join(__dirname,'hadithfiles')
    let folders = fs.readdirSync(mypath)

    for(let folder of folders){
        let files = fs.readdirSync(path.join(mypath,folder))

        if(!myjson["editions"][folder])
        myjson["editions"][folder] = {"hadiths":{}} 

        for(let file of files){
            let filePath = path.join(mypath,folder,file)
              let str = fs.readFileSync(filePath).toString()
              let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
                for(let val of arr){
                    let [num, grade] = val.split('|').map(e=>e.trim())
                    if(!myjson["editions"][folder]["hadiths"][num])
                    myjson["editions"][folder]['hadiths'][num] = {}
                    myjson["editions"][folder]['hadiths'][num]['hadithnumber'] = parseFloat(num)
                    myjson["editions"][folder]['hadiths'][num]['arabicnumber'] = parseFloat(num)
                    if(!myjson["editions"][folder]['hadiths'][num]['grades'])
                    myjson["editions"][folder]['hadiths'][num]['grades'] = []


                    
                    let tempjson = {}
                    tempjson['name'] = file.replace('.txt','').trim()
                    tempjson['grade'] = mapjson[grade]
                    myjson["editions"][folder]['hadiths'][num]['grades'].push(tempjson)

                }
    
          }

    }

    fs.writeFileSync(path.join(__dirname, 'grades.json'),JSON.stringify(myjson,null,4))


}
test()