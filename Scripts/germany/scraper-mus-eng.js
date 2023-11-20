const { chromium } = require('playwright');
const fs = require('fs/promises')
const path = require('path')

async function begin() {
    const browser = await chromium.launch({headless:true});
    const page = await browser.newPage();

    let bigArr = []
    let count = 0

 

    for(let i=1;i<=55;i++){
        await page.goto(`file:///C:/Users/nawaz/Downloads/mus/${i}.mhtml`)
        let data = await page.evaluate(() => Array.from(document.querySelectorAll('#hadithview')).map(e=>
        [
            e?.querySelector('p[dir="ltr"][align="left"]')?.textContent,
            [...e?.querySelector('p[dir="ltr"][align="left"]')?.textContent?.trim()?.matchAll(/\[.*?(\d+)\s*\]$/gi)]?.at(-1)?.[1]
        ]))

        bigArr.push(data)


    }

    await fs.writeFile(path.join(__dirname, 'sahih-muslim-eng-translated.json'), JSON.stringify(bigArr,null,4))
    await browser.close();

}
begin()