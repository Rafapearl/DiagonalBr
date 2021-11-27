const express = require("express");
const path = require("path");
const ytdl = require("ytdl-core");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use("/static", express.static("public"));

app.set("view engine", "ejs");

let url = "";
let title = "";
let loaded = false;

app.get("/", (req, res) => {
  res.render("../views/index", { url, src: `videos/${title}.mp4` });

  setTimeout(() => {
    url = "";
    title = "";
  }, 6000);
});

app.post("/", async (req, res) => {
  const { link } = req.body;

  if (!!link) {
    await ytdl.getInfo(link).then((info) => {
      url = link.replace("watch?v=", "embed/");
      //SUBSTITUI OS CARACTERES ESPECIAIS
      title = info.videoDetails.title.replaceAll(/\W/g, "");
      return ytdl(link).pipe(
        fs.createWriteStream(`public/videos/${title}.mp4`)
      );
    });
  }

  res.redirect("/");
});

app.get("/video", (req, res) => {
  res.render("../views/video", { src: `videos/${title}.mp4` });
});

app.post("/back", (req, res) => {
  //DELETA O ARQUIVO AO RETORNAR À PÁGINA PRINCIPAL

  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
