// different res for different req  (handleing different routes)

// import http from 'http';

// const server = http.createServer((req, res) => {
//     if (req.url == "/") {
//         res.writeHead(200, { "contant-type": "text/plain" })
//         res.end("HOME")
//     } else if (req.url == "/about") {
//         res.writeHead(200, { "content-type": "text/plain" })
//         res.end("ABOUT");
//     } else if (req.url == "/contact") {
//         res.writeHead(200, { "content-type": "text/plain" })
//         res.end("CONTACT");
//     } else {
//         res.writeHead(404, { "content-type": "text/plain" })
//         res.end("PAGE NOT FOUND !")
//     }
// })

// server.listen(3000, () => {
//     console.log("server is live");
// })


//what if we want to send res in html 

// import http from 'http';
// import fs from 'fs';

// const server = http.createServer((req, res) => {
//     if (req.url == '/') {
//         res.writeHead(200, { "content-type": "text/html" })
//         const html = fs.readFileSync("index.html", "utf-8")
//         res.end(html)
//     } else if (req.url == "/about") {
//         res.writeHead(200, { "content-type": "text/html" })
//         const html = fs.readFileSync("about.html", "utf-8")
//         res.end(html)
//     }
//     else {
//         res.writeHead(404, { "content-type": "text/html" })
//         res.end("PAGE NOT FOUND");
//     }
// })

// server.listen(3000, () => {
//     console.log("server is live");
// })


// when we want send json data


import http, { createServer } from 'http';
import { data } from "./data.js";
const server = createServer((req, res) => {
    if (req.url == '/' && req.method == 'GET') {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify(data))
    } else if (req.url == "/send" && req.method == 'POST') {
        res.writeHead(201, { "content-type": "application/json" })
        res.end(JSON.stringify({
            status: true,
            message: "data added !"
        }))
    }
    else {
        res.writeHead(404, { "content-type": "application/json" })
        res.end(JSON.stringify(
            {
                status: false,
                message: "page not found",
            })
        )
    }
})

server.listen(4000, () => {
    console.log("server is live");

})