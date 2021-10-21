const fs = require('fs');
let grades = fs.readFileSync('combinedgrades.txt').toString()

let nums = grades.match(/\d+/g)



let sortnums =  Array.from({length: 1858}, (_, i) => i + 1)
for(let i = 0;i<sortnums.length;i++){
    if(nums[i]!=sortnums[i]){
        console.log('this no is not avaialble',sortnums[i])
        break
    }
}