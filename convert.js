import fetch from "node-fetch";
import { parseString } from "xml2js";
fetch("http://restapi.adequateshop.com/api/Traveler?page=1",{
    method:'GET',
    header:{
        'Content-Type': 'text/xml'
    }
}).then(response=>{
    return response.text();
}).then(resText=>{
    let xmlData = resText;
    parseString(xmlData,function(err,result){
        let data = JSON.stringify(result);
        console.log(data);
    })
})