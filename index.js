const express = require("express");
const app = express();
const port = 3000;
const ytdl = require("ytdl-core")
const fs = require('fs')
llink = []


app.set("view engine", "ejs");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));




app.get("/", (req, res) => {
  res.render("../views/index");
});

app.get('/download', function (req, res) {
  const {url} = req.body
  res.header("Content-Disposition", 'attachmentt: filename="video.mp4"')
  
  return ytdl(url).pipe(fs.createWriteStream("video6.mp4"));
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

app.post("/download", (req, res) => {
  const {download, url  } = req.body;
  llink.push({download, url})
  message;
  res.redirect("/");
});