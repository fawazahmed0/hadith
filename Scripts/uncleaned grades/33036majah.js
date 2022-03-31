const fs = require('fs');
const path = require('path');
const { firefox } = require('playwright');
// Arnaut
async function test(){
    let num = '33036'
   let mypath =  path.join('E:\\', 'hadith','grad',num)
    let files = fs.readdirSync(mypath);
    let sortedFiles = files.map(e=>parseInt(e.split('.')[0])).sort((a, b) => (a - b))

    const browser = await firefox.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    let count = 0
    let grading = ''
    let content = ''
    for(let fileno of sortedFiles){

        let hadithgrade = ''
        let hadithcontent = ''
        try{
        await page.goto('file:///E:/hadith/grad/'+num+'/'+fileno+'.html',{timeout:60000})
        const elemCount = await page.locator('.hamesh').count()
        if(elemCount>0){
            hadithgrade  = await page.locator('.hamesh').textContent()
            await page.evaluate(e=>document.querySelector('.hamesh').remove()) 
        }
         
        hadithcontent = await page.locator('.nass').textContent()
        hadithcontent = hadithcontent.replace(/\d+\s*\-\s*(بَابُ|باب)/g,'')
        let nums = hadithcontent.match(/\(\d+\)/gi)
        nums = nums ? nums.map(e=>parseInt(e.slice(1,-1))) : []
        for(let numb of nums){
            hadithcontent =   hadithcontent.replaceAll('('+numb+')','|'+count+'|')
            hadithgrade = hadithgrade.replaceAll('('+numb+')','|'+count+'|')
            count++
        }
        grading+=hadithgrade+'\n'
        content+=hadithcontent+'\n'
        }catch(e){}
   


    
    
    }
    
    fs.writeFileSync(path.join(__dirname,num+'content.txt'),content)
    fs.writeFileSync(path.join(__dirname,num+'gradings.txt'),grading)


    await browser.close();
    

}

test()