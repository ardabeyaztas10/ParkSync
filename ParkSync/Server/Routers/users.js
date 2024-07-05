const express = require('express');
const Users = require('../Schema/userSchema');
const { hashPassword } = require('../Utils/hash');
const bcrypt = require('bcrypt');
const { generateToken } = require('../Utils/jwt'); 

const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { userName, email, password, userType } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Geçersiz e-posta adresi" });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Parola en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf ve bir küçük harf içermelidir" });
        }

        const existingUser = await Users.findOne({ $or: [{ userName }, { email }] });

        if (existingUser) {
            return res.status(400).json({ error: "Kullanıcı adı veya e-posta adresi zaten mevcut" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new Users({
            userName,
            email,
            password: hashedPassword,
            userType
        });

        await newUser.save();

        res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi" });
    } catch (error) {
        console.error("Kayıt sırasında hata: ", error);
        res.status(500).json({ error: "İçsel sunucu hatası" });
    }
});


router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await Users.findOne({ userName });
        if (!user) 
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Geçersiz kullanıcı adı veya şifre" });

        const token = generateToken(user._id);

        
        return res.status(200).json({ user, token, message: "Giriş başarılı" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});

router.post("/logout", (req, res) => {
    res.status(200).json({ message: "Oturumdan çıkış yapıldı" });
});


router.get("/user-info/:userName", async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await Users.findOne({ userName }).select('userName email plate');

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        res.status(200).json({ userName: user.userName, email: user.email, plate: user.plate });
    } catch (error) {
        console.error("Kullanıcı bilgilerini alırken hata: ", error);
        res.status(500).json({ error: "İçsel sunucu hatası" });
    }
});


router.put("/update-email/:userName", async (req, res) => {
    try {
        const userName = req.params.userName;
        const { newEmail } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            return res.status(400).json({ error: "Geçersiz e-posta adresi" });
        }

        const existingUser = await Users.findOne({ email: newEmail });
        if (existingUser) {
            return res.status(400).json({ error: "Bu e-posta adresi zaten başka bir kullanıcı tarafından kullanılıyor" });
        }

        const updatedUser = await Users.findOneAndUpdate({ userName }, { email: newEmail }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        res.status(200).json({ message: "E-posta adresi başarıyla güncellendi", email: updatedUser.email });
    } catch (error) {
        console.error("E-posta adresini güncellerken hata: ", error);
        res.status(500).json({ error: "İçsel sunucu hatası" });
    }
});


router.put("/update-plate/:userName", async (req, res) => {
    try {
        const userName = req.params.userName;
        const { newPlate } = req.body;

        const plateRegex = /^[A-Z0-9]{1,10}$/;
        if (!plateRegex.test(newPlate)) {
            return res.status(400).json({ error: "Geçersiz plaka formatı" });
        }

        const existingUser = await Users.findOne({ userName });
        if (!existingUser) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        const plateInUse = await Users.findOne({ plate: newPlate });
        if (plateInUse && plateInUse.userName !== userName) {
            return res.status(400).json({ error: "Bu plaka başka bir kullanıcı tarafından kullanılıyor" });
        }

        existingUser.plate = newPlate;
        await existingUser.save();

        res.status(200).json({ message: "Plaka başarıyla güncellendi", newPlate });
    } catch (error) {
        console.error("Plakayı güncellerken hata: ", error);
        res.status(500).json({ error: "İçsel sunucu hatası" });
    }
});


router.delete("/delete-user/:userName", async (req, res) => {
    try {
        const userName = req.params.userName;

        const deletedUser = await Users.findOneAndDelete({ userName });

        if (!deletedUser) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        res.status(200).json({ message: "Kullanıcı başarıyla silindi", deletedUser });
    } catch (error) {
        console.error("Kullanıcıyı silerken hata: ", error);
        res.status(500).json({ error: "İçsel sunucu hatası" });
    }
});


router.put("/change-password/:userName", async (req, res) => {
    try {
        const { userName } = req.params;
        const { newPassword } = req.body;

        const user = await Users.findOne({ userName });

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Şifre başarıyla değiştirildi" });
    } catch (error) {
        console.error("Şifre değiştirme sırasında hata: ", error);
        res.status(500).json({ error: "İçsel sunucu hatası" });
    }
});

module.exports = router;