import http, { createServer } from 'http'
import fs from 'fs'

fs.writeFileSync("list.txt", "")
const server = createServer((req, res) => {
    if (req.method == 'GET' && req.url == '/') {
        const method = req.method;
        const url = req.url;
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        fs.appendFileSync("list.txt", `${method}:${url}:${timeString}\n`)
        res.writeHead(200, { "content-type": "text/plain" })
        res.end("home page")
    } else if (req.method == 'POST' && req.url == '/send') {
        const method = req.method;
        const url = req.url;
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        fs.appendFileSync("list.txt", `${method}:${url}:${timeString}\n`)
        res.writeHead(201, { "content-type": "text/plain" })
        res.end("data added !")
    } else if (req.method == 'PUT' && req.url == '/update') {
        const method = req.method;
        const url = req.url;
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        fs.appendFileSync("list.txt", `${method}:${url}:${timeString}\n`)
        res.writeHead(200, { "content-type": "text/plain" })
        res.end("data upadated")
    } else if (req.method == 'DELETE' && req.url == '/delete') {
        const method = req.method;
        const url = req.url;
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        fs.appendFileSync("list.txt", `${method}:${url}:${timeString}\n`)
        res.writeHead(200, { "content-type": "text/plain" })
        res.end("data deleted")
    } else {
        res.writeHead(404, { "content-type": "text/plain" })
        res.end("page not found !")
    }
})

server.listen(3000, () => {
    console.log("server is live");
})