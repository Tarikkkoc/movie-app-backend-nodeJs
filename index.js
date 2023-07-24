const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/movies", (req, res) => {
  const movieJson = fs.readFileSync("./data/movies.json");
  const movieData = JSON.parse(movieJson);
  res.json(movieData);
});

app.get("/series", (req, res) => {
  const serieJson = fs.readFileSync("./data/series.json");
  const serieData = JSON.parse(serieJson);
  res.json(serieData);
});

app.get("/musics", (req, res) => {
  const musicJson = fs.readFileSync("./data/musics.json");
  const musicData = JSON.parse(musicJson);
  res.json(musicData);
});

app.get("/users", (req, res) => {
  const userJson = fs.readFileSync("./data/users.json");
  const userData = JSON.parse(userJson);
  res.json(userData);
});

app.post("/users", (req, res) => {
  const loginData = req.body;
  console.log("Gelen veriler", loginData);

  const loginJson = fs.readFileSync("./data/users.json", "utf-8");
  const data = JSON.parse(loginJson);

  data.push(loginData);

  const updatedLoginData = JSON.stringify(data, null, 2);
  fs.writeFileSync("./data/users.json", updatedLoginData, "utf-8");

  console.log("Veri kaydetme başarılı");
  res.status(200).json({ message: "veri başarıyla kaydedildi" });
});

app.listen(PORT, () => {
  console.log(`Express api çalışıyor: http://localhost${PORT}`);
});
