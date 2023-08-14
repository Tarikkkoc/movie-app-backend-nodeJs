const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const movies = require("./data/movies.json");
const series = require("./data/series.json");
const musics = require("./data/musics.json");
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

app.get("/movies/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const movie = movies.find((m) => m.title.toLowerCase() === title);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found!" });
  }
});

app.get("/series", (req, res) => {
  const serieJson = fs.readFileSync("./data/series.json");
  const serieData = JSON.parse(serieJson);
  res.json(serieData);
});

app.get("/series/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const serie = series.find((s) => s.title.toLowerCase() === title);

  if (serie) {
    res.json(serie);
  } else {
    res.status(404).json({ message: "Serie not found!" });
  }
});

app.get("/musics/:title", (req, res) => {
  const title = req.params.title.toLowerCase();
  const music = musics.find((m) => m.title.toLowerCase() === title);

  if (music) {
    res.json(music);
  } else {
    res.status(404).json({ message: "Music not found" });
  }
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

app.get("/admin", (req, res) => {
  const adminJson = fs.readFileSync("./data/admin.json");
  const adminData = JSON.parse(adminJson);
  res.json(adminData);
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

app.post("/movies", (req, res) => {
  const addMovie = req.body;
  console.log("Gelen veriler", addMovie);

  const addMovieJson = fs.readFileSync("./data/movies.json", "utf-8");
  const data = JSON.parse(addMovieJson);
  data.push(addMovie);

  const updatedMovieData = JSON.stringify(data, null, 2);
  fs.writeFileSync("./data/movies.json", updatedMovieData, "utf-8");

  console.log("Veri kaydetme başarılı");
  res.status(200).json({ message: "veri başarıyla kaydedildi" });
});

app.post("/series", (req, res) => {
  const addSerie = req.body;
  console.log("Gelen veriler", addSerie);

  const addSerieJson = fs.readFileSync("./data/series.json", "utf-8");
  const data = JSON.parse(addSerieJson);
  data.push(addSerie);

  const updatedSerieData = JSON.stringify(data, null, 2);
  fs.writeFileSync("./data/series.json", updatedSerieData, "utf-8");

  console.log("Veri kaydetme işlemi başarılı");
  res.status(200).json({ message: "veri başarıyla kaydedildi" });
});

app.post("/musics", (req, res) => {
  const addMusic = req.body;
  console.log("Gelen veriler", addMusic);

  const addMusicJson = fs.readFileSync("./data/musics.json", "utf-8");
  const data = JSON.parse(addMusicJson);
  data.push(addMusic);

  const updatedMusicData = JSON.stringify(data, null, 2);
  fs.writeFileSync("./data/musics.json", updatedMusicData, "utf-8");

  console.log("Veri kaydetme işlemi başarılı");
  res.status(200).json({ message: "veri başarıyla kaydedildi" });
});

app.put("/movies/:title", (req, res) => {
  const titleParam = req.params.title;
  const updatedData = req.body;

  const moviesData = fs.readFileSync("./data/movies.json", "utf-8");
  const movies = JSON.parse(moviesData);

  // Güncellenmek istenen filmi bul
  const movieIndex = movies.findIndex(
    (movie) => movie.title.toLowerCase() === titleParam.toLowerCase()
  );

  // Eğer film bulunamazsa hata mesajı dön
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  // Film bilgilerini güncelle
  movies[movieIndex] = { ...movies[movieIndex], ...updatedData };

  // Güncellenmiş film listesini tekrar JSON dosyasına yaz
  fs.writeFileSync(
    "./data/movies.json",
    JSON.stringify(movies, null, 2),
    "utf-8"
  );

  // Başarılı yanıt dön
  res.json({
    message: "Movie updated successfully",
    updatedMovie: movies[movieIndex],
  });
});

app.put("/series/:title", (req, res) => {
  const titleParam = req.params.title;
  const updatedData = req.body;

  const seriesData = fs.readFileSync("./data/series.json");
  const series = JSON.parse(seriesData);

  const serieIndex = series.findIndex(
    (serie) => serie.title.toLowerCase() === titleParam.toLowerCase()
  );

  if (serieIndex === -1) {
    return res.status(404).json({ message: "Serie not found" });
  }

  series[serieIndex] = { ...series[serieIndex], ...updatedData };

  fs.writeFileSync(
    "./data/series.json",
    JSON.stringify(series, null, 2),
    "utf-8"
  );

  res.json({
    message: "Serie updated successfully",
    updatedSerie: series[serieIndex],
  });
});

app.put("/musics/:title", (req, res) => {
  const titleParam = req.params.title;
  const updatedData = req.body;

  const musicsData = fs.readFileSync("./data/musics.json");
  const musics = JSON.parse(musicsData);

  const musicIndex = musics.findIndex(
    (music) => music.title.toLowerCase() === titleParam.toLowerCase()
  );

  if (musicIndex === -1) {
    return res.status(404).json({ message: "Music not found" });
  }

  musics[musicIndex] = { ...musics[musicIndex], ...updatedData };

  fs.writeFileSync(
    "./data/musics.json",
    JSON.stringify(musics, null, 2),
    "utf-8"
  );

  res.json({
    message: "Music updated successfully",
    updatedMusic: musics[musicIndex],
  });
});

app.delete("/movies/:title", (req, res) => {
  const titleParam = req.params.title;

  const moviesData = fs.readFileSync("./data/movies.json", "utf-8");
  const movies = JSON.parse(moviesData);

  // Silinmek istenen filmi bul
  const movieIndex = movies.findIndex(
    (movie) => movie.title.toLowerCase() === titleParam.toLowerCase()
  );

  // Eğer film bulunamazsa hata mesajı dön
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  // Film listesinden ilgili filmi kaldır
  movies.splice(movieIndex, 1);

  // Güncellenmiş film listesini tekrar JSON dosyasına yaz
  fs.writeFileSync(
    "./data/movies.json",
    JSON.stringify(movies, null, 2),
    "utf-8"
  );

  // Başarılı yanıt dön
  res.json({
    message: "Movie deleted successfully",
  });
});

app.delete("/series/:title", (req, res) => {
  const titleParam = req.params.title;

  const seriesData = fs.readFileSync("./data/series.json", "utf-8");
  const series = JSON.parse(seriesData);

  const serieIndex = series.findIndex(
    (serie) => serie.title.toLowerCase() === titleParam.toLowerCase()
  );

  if (serieIndex === -1) {
    return res.status(404).json({ message: "Serie not found" });
  }

  series.splice(serieIndex, 1);

  fs.writeFileSync(
    "./data/series.json",
    JSON.stringify(series, null, 2),
    "utf-8"
  );

  // Başarılı yanıt dön
  res.json({
    message: "Serie deleted successfully",
  });
});

app.delete("/musics/:title", (req, res) => {
  const titleParam = req.params.title;

  const musicsData = fs.readFileSync("./data/musics.json", "utf-8");
  const musics = JSON.parse(musicsData);

  const musicIndex = musics.findIndex(
    (music) => music.title.toLowerCase() === titleParam.toLowerCase()
  );

  if (musicIndex === -1) {
    return res.status(404).json({ message: "Music not found" });
  }

  musics.splice(musicIndex, 1);

  fs.writeFileSync(
    "./data/musics.json",
    JSON.stringify(musics, null, 2),
    "utf-8"
  );

  res.json({
    message: "Music deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Express api çalışıyor: http://localhost:${PORT}`);
});
