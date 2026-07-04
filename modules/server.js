// // commanjs
// const app = require("./app.js");

// app.add(10, 230);
// app.div(10, 230);

// another way of using module destructuring
// const {add,div} = require("./app.js")
// add(10,111)
// div(10,123)


// module

// import div, { add } from "./app.js"


// add(10, 22)
// div(10, 22)


//CORE MODULE - FS,PATH,HTTP

//  FS

// import fs from "fs";//import fs package

// fs.writeFileSync("index.txt", "hello form node server!");//this function is used for write content in file if file exsite if not it will create file.
// fs.appendFileSync("index.txt", "New Text")//this function is used to add content to the exsited file
// const data = fs.readFileSync("index.txt", "utf-8");//this function is used for read data form the file and store in variable
// console.log(data);


// PATH - work with file folder path   NOTE- path module can use only commanjs

// const path = require("path");

// console.log(path.basename(__filename));//basename give current file name
// console.log(path.dirname(__filename));//dirname give directory / path
// console.log(path.extname(__filename));//extname give file extension
// console.log(path.join(__dirname, "index.txt"));//join give path join to the file


// HTTP - used to create a simple web server in node.js

// import http from 'http';//import http

// // this function is createing a server
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "contect-type": "text/plain" });//header define
//     res.end(" IT'S YOUR NODE-SERVER");//send respons
// })

// // this function can live the server
// server.listen(3000, () => {
//     console.log("node server is  live");
// })

