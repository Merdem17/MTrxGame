// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

let users = {};

app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { wallet_address } = req.body;
  if (!wallet_address) return res.status(400).json({ error: 'Wallet adresi gerekli' });

  if (!users[wallet_address]) {
    users[wallet_address] = {
      wallet_address,
      is_active: false,
      kazim_gucu: 0,
      mevcut_kazim: 0
    };
  }

  res.json({ message: 'Kullanıcı kaydedildi', user: users[wallet_address] });
});

app.post('/api/deposit', (req, res) => {
  const { wallet_address } = req.body;
  if (!wallet_address || !users[wallet_address]) return res.status(400).json({ error: 'Kullanıcı bulunamadı' });

  users[wallet_address].is_active = true;
  res.json({ message: 'Deposit başarılı', user: users[wallet_address] });
});

app.get('/api/status', (req, res) => {
  const wallet_address = req.query.wallet_address;
  if (!wallet_address || !users[wallet_address]) return res.status(400).json({ error: 'Kullanıcı bulunamadı' });

  res.json({ user: users[wallet_address] });
});

app.post('/api/updateBalance', (req, res) => {
  const { wallet_address, kazim_gucu, mevcut_kazim } = req.body;
  if (!wallet_address || !users[wallet_address]) return res.status(400).json({ error: 'Kullanıcı bulunamadı' });

  users[wallet_address].kazim_gucu = kazim_gucu;
  users[wallet_address].mevcut_kazim = mevcut_kazim;

  res.json({ message: 'Balance güncellendi', user: users[wallet_address] });
});

app.post('/api/withdraw', (req, res) => {
  const { wallet_address } = req.body;
  if (!wallet_address || !users[wallet_address]) return res.status(400).json({ error: 'Kullanıcı bulunamadı' });

  if (users[wallet_address].mevcut_kazim < 250) {
    return res.status(400).json({ error: 'Yeterli kazım yok' });
  }

  users[wallet_address].mevcut_kazim = 0;
  res.json({ message: 'Withdraw başarılı', user: users[wallet_address] });
});

app.listen(PORT, () => console.log(`Sürüm2 backend simülasyonu ${PORT} portunda çalışıyor`));
