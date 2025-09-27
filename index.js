const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS ayarı: Her yerden gelen isteklere izin ver
app.use(cors());

// JSON body parser
app.use(express.json());

// GET endpoint (opsiyonel, test için)
app.get("/", (req, res) => {
  res.send("MTrxGame Backend Çalışıyor!");
});

// POST endpoint: frontend kazım verilerini buraya gönderir
app.post("/update", (req, res) => {
  const { kazimGucu, mevcutKazim } = req.body;
  
  console.log("Frontend'den gelen veri:", { kazimGucu, mevcutKazim });
  
  // Burada istersen verileri bir veritabanına kaydedebilirsin
  res.json({ status: "ok", message: "Veri alındı!" });
});

app.listen(PORT, () => {
  console.log(`Sürüm2 backend simülasyonu ${PORT} portunda çalışıyor`);
});
