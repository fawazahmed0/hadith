var gplay = require('google-play-scraper');
const fs = require('fs');
const path = require('path');

async function begin(){
    let data = await gplay.search({
        term: "hadith app",
        num: 250
      })
    
   fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2));
}
begin()