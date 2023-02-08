let fetch  = require('node-fetch');
let fs = require('fs');
let path = require('path');

async function test(){


    let url = 'https://al-maktaba.org/book/'
    // 1755 ,32832,33759,783,33865 ,782,33754 ,33861 ,810 ,1198,
    let books = [  33036]

    for(let book of books){

        let res = await fetch(url+book)
        let html = await res.text()

        fs.writeFileSync(path.join(__dirname, 'book-'+book+'.html'), html)
        fs.mkdirSync(path.join(__dirname, book.toString()), {recursive: true})

        let breakcounter = 0

        for(let i=1;;i++){
            
            if(breakcounter>30)
            break

            let res = await fetch(url+book+'/'+i)

            if(res.ok){
            let html = await res.text()
            fs.writeFileSync(path.join(__dirname,book.toString(), i+'.html'), html)
            breakcounter = 0
            }else
                breakcounter++
            

        }


    }


}

test()