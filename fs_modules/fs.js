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





if (!fs.existsSync("data")) {
    //existsSync -> check this folder exsit or not if is exsit code line start 63 but is not code line start from 60
    fs.mkdirSync("data");//mkdirSync -> create this folder in directory 
}

fs.writeFileSync("data/info.txt", "this is info file");//in that folder we are create a file named info.txt by using writeFileSync
const files = fs.readFileSync("data/info.txt", "utf-8");//get data from info.txt
console.log(files);

fs.renameSync("data/info.txt", "data/Update.txt");//rename file 
fs.appendFileSync("data/Update.txt", "\nthis is Updated text");//add new content in file 

console.log("all Files :", fs.readdirSync("data"));

