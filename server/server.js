const express = require("express");
const path = require("path");
const fs = require("fs");
const React = require("react");
const ReactDomServer = require("react-dom/server");
import App from "../src/App";


const DIST_PATH = path.resolve(__dirname,"../dist");
const PORT = process.env.PORT || 3000;


const app = express();

app.use(express.static(
    DIST_PATH
))
app.use("/app",(req, res, next)=>{
    fs.readFile(path.resolve("./dist/index.html"),"utf8", (error, data)=>{
        if(error){
            console.log("Error: ", error);
            return res.status(500).send("Something Went Wrong!");
        }
        return res.send(data.replace(
            '<div id="root">Change the inner HTML with react.</div></body></html>', 
            `<div id="root">${ReactDomServer.renderToString(<App/>)}</div>`
        ))
    })
})


// app.get("/", (req, res)=> {
//     res.sendFile(DIST_PATH+"/index.html");
// });

app.listen(PORT,()=>{
    console.log('Express server running at http://localhost:3000');
})