
const fs = require('fs/promises')
const path = require('path')

async function begin(){

 for(let fileName of (await fs.readdir( path.join(__dirname, '.'))).filter(e=>/\.json/i.test(e) ) ){
  let indexName = `${fileName.replace(/\.json/i, '')}arabic`
  let pathToFile = path.join(__dirname, fileName)
  let content = await fs.readFile(pathToFile)
  content = JSON.parse(content)

  let lastHadithNo = 0

  

  await fs.writeFile(path.join(__dirname, 'compiled4', fileName.replace(/\.json/i, '')+'.txt'), Object.entries(content).map(([key,value])=>`${key} | ${value[1]}`).join('\n'))
  for(let [key,value] of Object.entries(content)){
    break

    let jsonSearchResult = await search(value?.[0], indexName)
    let hadithNo = await getHadithNo(jsonSearchResult, lastHadithNo)

    if(!hadithNo)
    continue
    lastHadithNo = hadithNo
    value.push(hadithNo)
    content[key] = value
  }

 


 }
    


}
begin()

function getHadithNo(jsonSearchResult, lastHadithNo){

  return jsonSearchResult?.hits?.hits
  ?.map(e=>[e?._source?.column1, Math.abs(e?._source?.column1-lastHadithNo)]).
  sort((a,b)=>a[1]-b[1])?.[0]?.[0]

}

async function search(text, indexName){

    let queryBody = {
        "query": {
          "match": {
            "column2": 
            text.normalize("NFD").replace(/\p{Diacritic}|\p{Mark}|\p{Extender}|\p{Bidi_Control}/gu, "")
          }
        }
      }

      let requestOptions = {
        method:"POST",
         headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
        },
         body:JSON.stringify(queryBody)
       }
      
    let response = await fetch(`http://localhost:9200/${indexName}/_search`, requestOptions)
    let data = await response.json()

    return data


}