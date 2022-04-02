const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')

async function test(){
    let browser = await chromium.launch({ headless: true});
    let context = await browser.newContext();
    let page = await context.newPage();

    let link = 'https://www.rahmathpublications.com/muslim.php?start=1'

    await page.goto(link,{timeout:60000});
    let tamilbigArr = []
    let arabicbigArr = []

    while(true){
        await page.evaluate(()=>Array.from(document.querySelectorAll('.muslimheading')).map(e=>e.remove()))
        let tamilArr = await page.evaluate(()=>Array.from(document.querySelectorAll('#trans')).map(e=>e.textContent))
        let arabicArr = await page.evaluate(()=>Array.from(document.querySelectorAll('[class^="hadith-arabic-"]')).map(e=>e.textContent))
        tamilbigArr = tamilbigArr.concat(tamilArr.map(e=>e.replace(/\r?\n/gi,' ').replace(/\s\s+/gi,' ').trim()))
        arabicbigArr = arabicbigArr.concat(arabicArr.map(e=>e.replace(/\r?\n/gi,' ').replace(/\s\s+/gi,' ').trim()))
        let tobreak = await page.evaluate(()=>document.querySelector('.page-item:last-child').classList.contains('disabled'))
        if(tobreak)
        break
        await page.locator('.page-item:last-child > .page-link').click()
        await page.waitForLoadState()
  
    }
    fs.writeFileSync(path.join(__dirname,'muslimtamil.txt'),tamilbigArr.join('\n').trim())
    fs.writeFileSync(path.join(__dirname,'muslimarabic.txt'),arabicbigArr.join('\n').trim())
    await browser.close()
}

test()