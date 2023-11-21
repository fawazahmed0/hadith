
const fs = require('fs/promises')
const path = require('path')

async function begin(){

  let fileName = 'bukhari.json'
  let indexName = `${fileName.replace(/\.json/i, '')}arabic`
  let pathToFile = path.join(__dirname, fileName)
  let content = await fs.readFile(pathToFile)
  content = JSON.parse(content)

  let lastHadithNo = 0

  for(let [key,value] of Object.entries(content)){

    let jsonSearchResult = await search(value?.[0], indexName)
    let hadithNo = await getHadithNo(jsonSearchResult, lastHadithNo)

    if(!hadithNo)
    continue
    lastHadithNo = hadithNo
    value.push(hadithNo)
    content[key] = value
  }

  await fs.writeFile(pathToFile, JSON.stringify(content, null, 4))
    


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