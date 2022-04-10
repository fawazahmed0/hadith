const fs = require('fs');
const path = require('path');
var vm = require("vm")
var fetch = require('node-fetch');
async function test(){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    let mypath =  path.join('E:\\', 'hadith','alizai')
    let folders = fs.readdirSync(mypath).filter(e=>e=='nasai')
    let folder = 'nasai'

        let files = fs.readdirSync(path.join(mypath,folder))
        let sortedFiles = files.map(e=>parseInt(e.split('.')[0])).sort((a, b) => (a - b))
        let arr = []
        for(let fileno of sortedFiles){
            let str = fs.readFileSync(path.join(mypath,folder,fileno+'.js')).toString()
            eval(str.replace('var',''))
            let arabic = global[folder].arabic || ''
            let middlename = 'arabic'
            let indexname = folder + middlename+'scrapped3'


          
                    let hadithno = '9999999'
                      try{
                        //await new Promise(r => setTimeout(r, 500));
                        let jsonval = {
                          "query": {
                            "match": {
                                // 29-)
                              "column2": arabic.trim()
                            }
                          }
                        }
                        var requestOptions = {
                          method:"POST",
                           headers: {"Authorization": "Basic ZWxhc3RpYzpYckQ1ZVhJb1hZVHp6KllkMGJSeA==",
                           "Content-Type": "application/json",
                           "Accept": "application/json"},
                           body:JSON.stringify(jsonval)
                         }
                      let res = await fetch("https://localhost:9200/"+indexname+"/_search", requestOptions)
                      if(!res.ok)
                      console.log("issue with val")
                      let data = await res.json()
           
                      hadithno = data.hits.hits[0]._source.column1
                      hadithno = alpha2num(hadithno)
                  //    if(Math.abs(hadithno - lasthadithno) > 10)
                  //    throw 'issue with hadith no '+hadithno+ " diff is "+(hadithno - lasthadithno)
                   //   lasthadithno = hadithno
                      }catch(e){console.error(e)}
                      //console.log('hadith no is',hadithno)
                      arr.push(fileno+' | '+hadithno+' | '+arabic)
         
          
              

            
        }

        fs.writeFileSync(path.join(__dirname,folder+'newgradings.txt'),arr.join('\n'))
       
    
}

function alpha2num(str){
    let val =  str.match(/(\d+)([a-z])/)
     if(val)
         return val[1] +'.' + (val[2].charCodeAt(0)-96)
         return str
  }


test()