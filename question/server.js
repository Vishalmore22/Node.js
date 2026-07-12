import http, { createServer } from 'http'
import { json } from 'stream/consumers'
import { data } from "./data.js";

const server = createServer((req, res) => {
    if (req.url == '/' && req.method == 'GET') {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(
            JSON.stringify({
                states: true,
                message: "HOME PAGE"
            })
        )
    } else if (req.url == '/users' && req.method == "GET") {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify(data));
    } else if (req.url == '/api/users' && req.method == 'POST') {
        res.writeHead(201, { "content-type": "application/json" })
        res.end(
            JSON.stringify({
                states: true,
                message: "User created successfully",
            })
        )
    } else if (req.url == '/api/users/remove' && req.method == 'DELETE') {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(
            JSON.stringify({
                states: true,
                message: "User delete successfully",
            })
        )
    } else if (req.url == '/' && req.method == 'PUT') {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(
            JSON.stringify({
                states: true,
                message: "User update successfully",
            })
        )
    } else {
        res.writeHead(404, { "content-type": "application/json" })
        res.end(
            JSON.stringify({
                states: false,
                message: "page not found",
            }))
    }
})

server.listen(4000, () => {
    console.log("server is live ");
})