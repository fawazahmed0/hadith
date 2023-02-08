let fetch  = require('node-fetch');
let fs = require('fs');
let path = require('path');

async function test(){


    let url = 'https://al-maktaba.org/book/'
    // 1755 ,32832,33759,783,33865 ,782,33754 ,
    let books = [ 1755 ,32832,33759,783,33865 ,782,33754,33861 ,810 ,1198, 33036]

    for(let book of books){

    let bookPath = path.join(__dirname, book.toString())

    for(let file of fs.readdirSync(bookPath)){
        let filePath = path.join(bookPath,file)
        const stats = fs.statSync(filePath);
        if(stats.size == 0){
            let html,res
            for(let i=0;i<4;i++){
         res = await fetch(url+book+'/'+file.replace('.html',''))
             html = await res.text()
            if(html.trim()!='' && res.ok)
              break
            }
            
            fs.writeFileSync(filePath, html)
            console.log('saved for',filePath)
            
        }

    }


    }


}

test()