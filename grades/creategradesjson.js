const fs = require('fs');
const path = require('path');
var capitalize = words => words.split(' ').map(w => w[0].toUpperCase() + w.substring(1)).join(' ')

async function test(){
    let myjson = {"editions":{}}
    let mapjson = JSON.parse(fs.readFileSync(path.join(__dirname,'engaramap.json')).toString())
    let mypath =  path.join(__dirname,'hadithfiles')
    let folders = fs.readdirSync(mypath)

    for(let folder of folders){
        let files = fs.readdirSync(path.join(mypath,folder))

        if(!myjson["editions"][folder])
        myjson["editions"][folder] = {"hadiths":{}} 
        try{
        let refstr = fs.readFileSync(path.join(__dirname, 'ref', folder+'reference.txt')).toString()

        let refArr = [...refstr.matchAll(/(\d+)In\-book\s*reference\s*\:\s*Book\s*(\d+)\,\s*hadith\s*(\d+)/ig)]
  
        for(let ref of refArr){
            let num = parseFloat(ref[1])
            if(!myjson["editions"][folder]["hadiths"][num])
            myjson["editions"][folder]['hadiths'][num] = {}
            if(!myjson["editions"][folder]['hadiths'][num]['bookref'])
            myjson["editions"][folder]['hadiths'][num]['bookref'] = {"book":parseFloat(ref[2]),"hadith":parseFloat(ref[3])}
            
        }
    }catch(e){console.error(e)}


        for(let file of files){
            let filePath = path.join(mypath,folder,file)
              let str = fs.readFileSync(filePath).toString()
              let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
                for(let val of arr){
                    let [num, grade] = val.split('|').map(e=>e.trim())
                    num = parseFloat(num)
                    if(!myjson["editions"][folder]["hadiths"][num])
                    myjson["editions"][folder]['hadiths'][num] = {}
                    myjson["editions"][folder]['hadiths'][num]['hadithnumber'] = parseFloat(num)
                    myjson["editions"][folder]['hadiths'][num]['arabicnumber'] = parseFloat(num)
                    if(!myjson["editions"][folder]['hadiths'][num]['grades'])
                    myjson["editions"][folder]['hadiths'][num]['grades'] = []

                    


                    
                    let tempjson = {}
                    tempjson['name'] = file.replace('.txt','').trim()
                    
                    try{
                        tempjson['grade'] = capitalize(mapjson[grade])
                    }catch(e){
                        console.log('value  is ',mapjson[grade], "for ", grade)
                        tempjson['grade'] = mapjson[grade]
                    }
                    
                    myjson["editions"][folder]['hadiths'][num]['grades'].push(tempjson)

                }
    
          }

    }

    fs.writeFileSync(path.join(__dirname, 'grades.json'),JSON.stringify(myjson,null,'\t'))


}
test()