const fs = require('fs');
const path = require('path');
const { firefox } = require('playwright');

async function test(){
    let num = '33754'
   let mypath =  path.join('E:\\', 'hadith','grad',num)
    let files = fs.readdirSync(mypath);
    let sortedFiles = files.map(e=>parseInt(e.split('.')[0])).sort((a, b) => (a - b))

        const browser = await firefox.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    let arr = []
    for(let fileno of sortedFiles){
        try{

        await page.goto('file:///E:/hadith/grad/'+num+'/'+fileno+'.html',{timeout:60000})
        const elemCount = await page.locator('.hamesh').count()
        if(elemCount<1)
        continue
        let hadithno  = await page.locator('.nass').textContent()
        hadithno = hadithno.trim().match(/\d+\s*-/)[0]
        let grade = await page.locator('.hamesh').textContent()
        arr.push(hadithno+' | '+grade)
       // console.log(hadithno+' | '+grade)
        }catch(e){}
    }

    fs.writeFileSync(path.join(__dirname,num+'gradings.txt'),arr.join('\n'))


    await browser.close();
    

}

test()