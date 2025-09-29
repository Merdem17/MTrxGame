const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Basit test endpointi
app.get("/", (req, res) => {
  res.send("Backend çalışıyor!");
});

// Kullanıcı kazım gücü güncellemesi için endpoint
app.post("/update", (req, res) => {
  const { userId, kazimGucu } = req.body;

  console.log("Kazım gücü güncellendi:", userId, kazimGucu);

  // Şimdilik verileri sadece logluyoruz
  res.json({ success: true, message: "Veri alındı", userId, kazimGucu });
});

// Render için port ayarı
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sürüm2 backend simülasyonu ${PORT} portunda çalışıyor`);
});
