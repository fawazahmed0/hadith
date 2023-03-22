async function test(){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    
    let indexname = "abudawudbengali"
    let jsonval = {
        "query": {
          "match": {
            "column2": "حدثنا مسدد بن مسرهد، حدثنا عيسى بن يونس، أخبرنا إسماعيل بن عبد الملك، عن أبي الزبير، عن جابر بن عبد الله، أن النبي صلي الله عليه وسلم كان إذا أراد البراز انطلق حتى لا يراه أحد ‏\n- صحيح \n"
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
    let res = await fetch("https://localhost:9200/"+indexname+"/_search", requestOptions)
    let data = await res.json()
    console.log(data)

}

test()