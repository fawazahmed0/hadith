const fs = require('fs');
const path = require('path');

async function test(){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    let mypath =  path.join('G:\\', 'hadith','alizai')
    let folders = fs.readdirSync(mypath).filter(e=>e!='fetc.js')
    let indexmap = {"abudawood":"abudawud","ibnemaja":"ibnmajah","nasai":"nasai","tirmizi":"tirmidhi"}

    for(let folder of folders.reverse()){
        let files = fs.readdirSync(path.join(mypath,folder))
        let sortedFiles = files.map(e=>parseInt(e.split('.')[0])).sort((a, b) => (a - b))
      
        console.log(folder)

        let myjson = {}

        for(let fileno of sortedFiles){

            let str = fs.readFileSync(path.join(mypath,folder,fileno+'.js')).toString()
            eval(str.replace('var',''))
            

            let indexname = `${indexmap[folder]}arabic`
            let jsonval = {
                "query": {
                    "match": {
                        "column2": global[folder].arabic.normalize("NFD").replace(/\p{Diacritic}|\p{Mark}|\p{Extender}|\p{Bidi_Control}/gu, "")
                    }
                }
            }

            var requestOptions = {
                method: "POST",
                headers: {
                    "Authorization": "Basic ZWxhc3RpYzpXekswNXRTVVh4UzZibUlZRHhzOQ==",
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(jsonval)
            }
            let res = await fetch("https://192.168.1.192:9200/" + indexname + "/_search", requestOptions)
            let resdata = await res.json()

            let grade = global[folder]?.hukam || global[folder]?.description || ''


            let newhadithno = resdata?.hits?.hits?.[0]?._source?.column1  
            if(!newhadithno || !grade)
            continue

            console.log(newhadithno)

            myjson[newhadithno] = grade

 



        }

        fs.writeFileSync(path.join(__dirname,`${indexmap[folder]}.grades.json`),JSON.stringify(myjson,null,4))
    }

}
test()