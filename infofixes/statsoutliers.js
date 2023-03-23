let data = [1,2,3,4,5,6]
data = data.sort((a,b)=>a-b)
let len = data.length-1
let from = data[Math.round(len*0.25)]
let to = data[Math.round(len*0.75)]

let min = from*0.70
let max = to*1.30

console.log(from,to,min,max)

data = data.filter(e=>min<=e && e<=max)
console.log(data)