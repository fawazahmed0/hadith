let path = require('path');
let fs = require('fs');



async function test(){

    let cleanPath = path.join(__dirname,'cleaned')
    let apiFilePath = path.join(__dirname,'site')
    for(let file of fs.readdirSync(cleanPath)){

        let cleanArr = fs.readFileSync(path.join(cleanPath,file)).toString().trim().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))
        let apiFileArr = fs.readFileSync(path.join(apiFilePath,file)).toString().trim().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))

        let cleanObj = cleanArr.map(e=>[e.split(' | ')[0],e.split(' | ').slice(1)])
        cleanObj = Object.fromEntries(cleanObj)

        let apiFileObj = apiFileArr.map(e=>[e.split(' | ')[0],e.split(' | ').slice(1)])
        apiFileObj = Object.fromEntries(apiFileObj)

        let fullObj = {...apiFileObj,...cleanObj}

        fs.writeFileSync(path.join(cleanPath,file),Object.entries(fullObj).map(e=>e.join(' | ')).join('\n'))
    }
    

}

test()