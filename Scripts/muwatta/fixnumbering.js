const fs = require('fs');


let str = fs.readFileSync('sahihpartial.txt').toString()


let result = str.match(/\d+\/\d+/gs)

let nums = result.map(e=>e.split('/').map(e=>parseInt(e)).sort(function(a, b){return b-a}).join('/'))

for(let i =0;i<nums.length;i++)
    str = str.replace(result[i],nums[i])



fs.writeFileSync('corrected.txt',str)



/*
for(let i =0;i<nums.length-2;i++){


    
  //  let somearr = [nums[i+1],nums[i+2]].flat().map(e=>e-nums[i][0])
  let somearr = [nums[i+1]].flat().map(e=>e-nums[i][0])
    let pre=somearr[0];
    let index = 0
    for (let j=0 ;j<somearr.length;j++){
        let val = somearr[j]
        if(val>0 && val<pre){
          pre = val
          index=j
        }


    }
 
    console.log('index is',index)
    if(index==1){
      //  nums[i+1][1]=nums[i+1][index==0?1:0]
       // nums[i+1][0]=nums[i+1][index]
       [nums[i+1][0], nums[i+1][1]] = [nums[i+1][1], nums[i+1][0]];
        console.log('nums',nums[i+1])
    }
   
    else if(index==2){
       
     //   nums[i+2][1]=nums[i+2][index%2==0?1:0]
      //  nums[i+2][0]=nums[i+2][index%2]
      [nums[i+2][0], nums[i+2][1]] = [nums[i+2][1], nums[i+2][0]];
        console.log('nums',nums[i+2])
        i+=2
    }
   
    
  
    

    
}

*/