const fs = require('fs');
const path = require('path');
const { firefox } = require('playwright');

async function test(){

   let mypath =  path.join('E:\\', 'hadith','grad','1755')
    let files = fs.readdirSync(mypath);
    let sortedFiles = files.map(e=>parseInt(e.split('.')[0])).sort((a, b) => (a - b))

        const browser = await firefox.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    let arr = []
    for(let fileno of sortedFiles){

        await page.goto('file:///E:/hadith/grad/1755/'+fileno+'.html')
        let hadithno  = await page.locator('[style="color:#707070"]').textContent()
        let grade = await page.locator('.hamesh').textContent()
        arr.push(hadithno+' | '+grade)

        
    }

    fs.writeFileSync(path.join(__dirname,'1755gradings.txt'),arr.join('\n'))


    await browser.close();
    

}

test()