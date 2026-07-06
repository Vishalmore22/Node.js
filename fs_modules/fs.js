import { log } from 'console';
import fs from 'fs';

// The FS Modules Lets You Interact With Your Computer's Files You Can Create,Read,Update And Rename Files 

// You Can Use Two Tyeps Of Methods - Synchronous(Blocking) & Asynchronous(Non-Blocking)

// fs.writeFileSync("message.txt", "FS-MODULES");

// fs.writeFile("message.html", "", (err) => {
//     if (err) throw err;
//     console.log(`File Created Asynchronously`);
// })

// fs.readFile("message.html", "utf-8", (err, data) => {
//     if (err) throw err;
//     console.log(data);

// })

// file add (appendfilesync)
// fs.appendFile("message.html", "", (err) => {
//     if (err) throw err;
//     console.log("content added");
// })

// what sync do -> it block all code unit the sync process complate
// what async do -> it does't block code both are running same time  

// file deleted
// fs.unlinkSync("message.html");
// console.log("file deleted");

// rename files
// fs.renameSync("files","newFiles" );




// to create folder
// fs.mkdirSync("files");

// create file in folder
// fs.writeFileSync("newFiles/message.txt", "");
// console.log("file created");

// to know know what inside the folder
// const files = fs.readdirSync("newFiles");
// console.log(files);


// delete file + folder
// fs.unlinkSync("newFiles/message.txt"); -> 
// fs.rmdirSync("newFiles");