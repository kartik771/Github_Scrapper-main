let url = "https://github.com/topics";
let mainurl = "https://github.com"
const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const issue = require("./issues");

request(url,cb);

function cb(err,res,body){
    if(err) console.log(err);
    else {
        handleHTML(body);
    }
    
}

function handleHTML(html){

    issue.makeFolder("ISSUES")

    let topicsarr = issue.getObj(html,'a[class="no-underline flex-1 d-flex flex-column"]');
    console.log(topicsarr.length);
    
    for(let i =0 ;i<3;i++){
        let linktopic = issue.gotolink(mainurl,html,topicsarr[i]);
        let topicName = issue.extractText(html,topicsarr[i]).split('\n')[1].trim();
        console.log(topicName+""+linktopic);
        issue.handleLink(topicName, linktopic);
    
    }


}