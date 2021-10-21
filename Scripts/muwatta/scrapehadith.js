


const { firefox } = require('playwright');
const fs = require('fs');

async function test(){

    const browser = await firefox.launch({ headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    let str = "";
    for(let i=1;i<=61;i++){
        await page.goto('https://sunnah.com/malik/'+i)
        str ='\n'+str+'\n'+await page.evaluate(() =>Array.from(document.querySelectorAll('.actualHadithContainer')).map(e=>e.querySelector('.english_hadith_full').textContent.replaceAll('\n',' ') + '\n'+e.querySelector('.hadith_reference').textContent.replaceAll('\n',' ')+'\n\n'))
        
    }
    await browser.close();

    fs.writeFileSync('scrapped1.txt',str)
    

  
}

test()