const fs = require('fs');
const path = require('path');
const { firefox } = require('playwright');
// Arnaut
async function test(){
    let num = '33861'
   let mypath =  path.join('E:\\', 'hadith','grad',num)
    let files = fs.readdirSync(mypath);
    let sortedFiles = files.map(e=>parseInt(e.split('.')[0])).sort((a, b) => (a - b))

    const browser = await firefox.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();


    let content = ''
    for(let fileno of sortedFiles){



        try{
        await page.goto('file:///E:/hadith/grad/'+num+'/'+fileno+'.html',{timeout:60000})

         
        hadithcontent = await page.locator('.nass').textContent()

        hadithcontent = hadithcontent.replace(/\d+\s*\-\s*(بَابُ|باب)/g,'')    

        content+=hadithcontent+'\n'
        }catch(e){}
 


    
    
    }
    
    fs.writeFileSync(path.join(__dirname,num+'gradings.txt'),content)



    await browser.close();
    

}

test()