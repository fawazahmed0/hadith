const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')
async function test(){

    let browser = await chromium.launch({ headless: true});
    let context = await browser.newContext();
    let page = await context.newPage();
    let link = 'http://forhuman.free.fr/hadith/muslim/'
    let largestr = ''
    for(let i=0;i<=55;i++){
        await page.goto(link+(''+i).padStart(2, '0')+'.htm',{timeout:60000}); 
        largestr+= await page.locator('html').textContent()

   
    }




    await browser.close()
    
    fs.writeFileSync(path.join(__dirname,'muslimfrench.txt'),largestr.trim())

}
test()