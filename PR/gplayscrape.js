const { firefox } = require('playwright');
const fs = require('fs');
const path = require('path');

async function begin(){
    let allEmails = []

    let data =  fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8')
   data= JSON.parse(data)



  const browser = await firefox.launch({headless:false});

  // Create pages, interact with UI elements, assert values
  const page = await browser.newPage();
let count=0
  for(let obj of data){
  await page.goto(obj.url)
  let emails = await page.evaluate(() => Array.from(document.querySelectorAll('a[href^="mailto"')).map(e=>e.getAttribute('href')))
  allEmails.push(...emails)


  }
  allEmails = [...new Set(allEmails)]
  fs.writeFileSync(path.join(__dirname, 'playemails.txt'), allEmails.join('\n'))
  await browser.close();
}

begin()