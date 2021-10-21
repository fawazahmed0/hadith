const fs = require('fs');

let sahihgrades = fs.readFileSync('sahihgrades.txt').toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))

let daifgrades = fs.readFileSync('daifgrades.txt').toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem))

let allgrades = [...sahihgrades,...daifgrades]

let sortnums = allgrades.map(e=>e.split('/')[0]).sort((a, b) => a - b);

let saver = []

for(let num of sortnums)
saver.push(allgrades.find(e => e.startsWith(num+'/')))

 fs.writeFileSync('combinedgrades2.txt',saver.join('\n'))