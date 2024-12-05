const http = require("http");
const fs = require("fs");
const url = require("url")

const myServer = http.createServer((req,res)=>{
    if(req.url ==="/favicon.ico") return res.end();
    const log = `${Date.now()} : ${req.url} :new request from server \n`
    fs.appendFile("log.txt",log,(err,data)=>{
        const myurl = url.parse(req.url,true);
        console.log(myurl);

        switch(myurl.pathname){
            
            case "/about" :const userName = myurl.query.myname;
            res.end(`hello this ${userName}`);
            break;
            case "/contact-us": res.end("Hello This Is contact  Page");
            break;
            default: res.end("404 page not found");
        }

    })
    

    

})
myServer.listen(8000,()=>{
    console.log('Server connected');
})