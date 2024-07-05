const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Veritabanı bağlantısı başarılı");
    } catch (error) {
        console.error("Veritabanına bağlanırken bir sorun oluştu ", error);
    }
}

module.exports = connect;