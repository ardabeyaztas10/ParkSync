const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Veritabanı bağlantısı başarılı'))
  .catch(err => console.error('Veritabanı bağlantı hatası:', err));

const ParkingSpot = mongoose.model('ParkingSpot', mongoose.Schema({}, { strict: false }), 'parking_spots');

async function refreshParkingSpots() {
  try {
    const parkingSpots = await ParkingSpot.find();
    console.log("Park alanları yenilendi:", new Date());
  } catch (err) {
    console.error('Park alanları getirme hatası:', err);
  }
}

refreshParkingSpots();

setInterval(refreshParkingSpots, 60000);

app.get('/parkingSpots', async (req, res) => {
  try {
    const parkingSpots = await ParkingSpot.find();
    res.json(parkingSpots);
  } catch (err) {
    console.error('Park alanları getirme hatası:', err);
    res.status(500).json({ message: 'Park alanları getirme hatası' });
  }
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


