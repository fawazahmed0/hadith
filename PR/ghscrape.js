// Scrape from wachers list or issue page:
//  Array.from(document.querySelectorAll('a[data-hovercard-type="user"]')).map(e=>e.getAttribute('href'))


const { firefox } = require('playwright');
const fs = require('fs');
const path = require('path');

async function begin(){
    let allEmails = []

    let users =  fs.readFileSync(path.join(__dirname, 'ghusers.txt'), 'utf8').split('\n').filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())
    users = [...new Set(users)]
    console.log(users.length)


  const browser = await firefox.launch({headless:false});

  // Create pages, interact with UI elements, assert values
  const page = await browser.newPage();
  await page.goto('https://github.com/login');
  await page.waitForTimeout(60*1000);
  let count = 0
  for(let user of users){
  await page.goto(`https://github.com/${user}`)
  let emails = await page.evaluate(() => Array.from(document.querySelectorAll('a[href^="mailto"')).map(e=>e.getAttribute('href')))
  allEmails.push(...emails)
 

  }
  allEmails = [...new Set(allEmails)]
  fs.writeFileSync(path.join(__dirname, 'ghemails.txt'), allEmails.join('\n'))
  await browser.close();
}

begin()