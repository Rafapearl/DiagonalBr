const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.render("../views/index");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
