const { firefox } = require('playwright');
const fs = require('fs/promises')
const path = require('path')

async function begin() {
    const browser = await firefox.launch({headless:true});
    const page = await browser.newPage();

    let bigArr = []
    let count = 0

    let mainLink = 'https://islamische-datenbank.de/sahih-al-buchari'

    for(let i=1;i<=89;i++){
        await page.goto(`${mainLink}?action=viewhadith&chapterno=${i}&min=0&show=1000`)
        let data = await page.evaluate(() => Array.from(document.querySelectorAll('#hadithview')).map(e=>
        [
            e?.querySelector('p[dir="rtl"][align="right"]')?.textContent,
            e?.querySelector('p[dir="ltr"][align="left"]')?.textContent,
            [...e?.querySelector('p[dir="ltr"][align="left"]')?.textContent?.trim()?.matchAll(/\[.*?(\d+)\s*\]$/gi)]?.at(-1)?.[1]
        ]))

        bigArr.push(data)

     //   if(count++==2)
    //    break

    }

    await fs.writeFile(path.join(__dirname, mainLink.split('/').at(-1)+'.json'), JSON.stringify(bigArr,null,4))
    await browser.close();

}
begin()