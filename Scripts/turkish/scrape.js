const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')

async function test(){
    const browser = await chromium.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();

    let links = ['https://ayethadisbul.com/hadis/sahihi-buhari-hadis-kitabi','https://ayethadisbul.com/hadis/sahihi-muslim-hadis-kitabi','https://ayethadisbul.com/hadis/suneni-tirmizi-hadis-kitabi',
    'https://ayethadisbul.com/hadis/suneni-ebu-davud-hadis-kitabi','https://ayethadisbul.com/hadis/suneni-nesai-hadis-kitabi',
'https://ayethadisbul.com/hadis/suneni-ibn-mace-hadis-kitabi','https://ayethadisbul.com/hadis/imam-malik-muvatta-hadis-kitabi']

for(let link of links){
    let majorArr = []
    await page.goto(link,{timeout:60000});
    let noOfPages = await page.evaluate(()=>document.querySelectorAll('.page-item').length - 2)
    for(let i=1;i<=noOfPages;i++){
        await page.goto(link+'?p='+i,{timeout:60000});
        let contentArr = await page.evaluate(()=>Array.from(document.querySelectorAll('[class^="grid"] .card-body div:first-child')).map(e=>e.textContent))
        majorArr = majorArr.concat(contentArr)
      
    }
fs.writeFileSync(path.join(__dirname,link.split('/').slice(-1)[0]+'.txt'), majorArr.join('\n').trim())
}

await browser.close();

}

test()