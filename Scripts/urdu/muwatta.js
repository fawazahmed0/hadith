




const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')

let contentArr = [[],[],[]]

async function test(){

    const browser = await chromium.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();

    let link = 'http://www.hadithurdu.com/08/8-1-'

    for(let i=1;;i++){
        try{
        let res = await page.goto(link+i,{timeout:60000});
        if(!res.ok())
            break
        let arabic = await page.locator('.arabic-hadith').textContent()
        let english = await page.locator('.english-hadith').textContent()
        let urdu = await page.locator('.urdu-hadith').textContent()
        contentArr[0].push(i+' | '+arabic.replace(/\s\s+/g, ' ').trim())
        contentArr[1].push(i+' | '+english.replace(/\s\s+/g, ' ').trim())
        contentArr[2].push(i+' | '+urdu.replace(/\s\s+/g, ' ').trim())
        }catch(e){}
    }

    // save data
    for(let i=0;i<3;i++){
        let mypath = path.join(__dirname,'muwatta')
        fs.mkdirSync(mypath, {
            recursive: true
          });

          fs.writeFileSync(path.join(mypath,i+'.txt'),contentArr[i].join('\n').trim())
    }

 
    

 
    await browser.close();
  
}

test()