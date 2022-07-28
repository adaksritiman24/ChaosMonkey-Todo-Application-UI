const express = require("express");
const path = require("path");

const DIST_PATH = path.resolve(__dirname,"../dist");
const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.static(
    DIST_PATH
))

app.get("/", (req, res)=> {
    res.sendFile(DIST_PATH+"/index.html");
});

app.listen(PORT,()=>{
    console.log('Express server running at http://localhost:3000');
})