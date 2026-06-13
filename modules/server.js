

//  1) core module

// import fs from "fs";

// fs.writeFileSync("hello.txt", "hello world");// this module use to write content in file if file exist. if file not exist it create file then write all content.


// const data = fs.readFileSync("hello.txt", "utf-8");//this module is use to read file if exist file there. it return content
// console.log(data);

// fs.appendFileSync("index.html", "<html><head><title>Node js day 3</title></head><body><h1>Node-JS</h1></body></html>")


// // path module

// const path = require("path");

// console.log(path.basename(__filename));// so we can get file name by using path.basename
// console.log(path.dirname(__filename));//  path.dirname gives you directory (file location)
// console.log(path.extname(__filename));//  path.extname gives you file extention 
// console.log(path.join(__filename, "index.html"));//  path.join -> join your file to the directory  


// // new morder way 

// import path from 'path';

// console.log(path.basename(import.meta.url));

//http 

// import http from 'http';

// const Server = http.createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text/plain" });
//     res.end("Hello From Node Server !!");
// });

// Server.listen(3000, () => {
//     console.log("Server is live");
// })




// 2) custom module

// // const app = require("./app.js");

 // app.sum(10, 30);
 // app.div(40, 20);

 // //when we exports multiple thing use this
 // const { sum, div } = require("./app.js");

 // sum(10, 12);
 // div(89, 20);

// // in morden way

// import sum, { div } from "./app.js";

// sum(10, 15);
// div(10, 15);



// 3) third-party module

// import chalk from 'chalk'

// console.log(chalk.green("success!"));
// console.log(chalk.red("error!"));
// console.log(chalk.blue("info message!"));

