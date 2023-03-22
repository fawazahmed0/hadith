async function test(){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    
    let indexname = "abudawudarabic"
    let jsonval = {
        "query": {
          "match": {
            "column2": "حدثنا مسدد، حدثنا عبد الله بن داود، عن سلمة بن نبيط، عن رجل، من الحي، عن أبيه نبيط، أنه رأى النبي صلى الله عليه وسلم واقفا بعرفة على بعير أحمر يخط"
          }
        }
      }
      var requestOptions = {
        method:"POST",
         headers: {"Authorization": "Basic ZWxhc3RpYzpXekswNXRTVVh4UzZibUlZRHhzOQ==",
         "Content-Type": "application/json",
         "Accept": "application/json"},
         body:JSON.stringify(jsonval)
       }
    let res = await fetch("https://192.168.1.192:9200/"+indexname+"/_search", requestOptions)
    let data = await res.json()
    console.log(JSON.stringify(data,null,4))

}

test()