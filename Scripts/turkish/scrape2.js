const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')

async function test(){
    const browser = await chromium.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage()

    let links = ['']

    for(let link of links){



    }
    await browser.close();
    
}