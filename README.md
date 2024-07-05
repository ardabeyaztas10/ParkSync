# Akıllı Otopark Yönetim Sistemi (ParkSync)

Bu proje, ESP32-CAM modülleri ve derin öğrenme modelleri (YOLO ve CNN) kullanarak park yerlerini algılayan ve sınıflandıran bir mobil uygulama geliştirmeyi amaçlamaktadır. Sistem, park yeri müsaitlik durumunu gerçek zamanlı olarak sağlayarak sürücülerin uygun yerleri bulmasını kolaylaştırır ve otopark yönetim verimliliğini artırır.

## İçindekiler

- [Özellikler](#özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)

## Özellikler

- Gerçek zamanlı park yeri algılama ve sınıflandırma
- YOLOv8 ve CNN modelleri ile yüksek doğruluk ve verimlilik
- Kullanıcı dostu mobil uygulama ile park yeri müsaitlik durumunu izleme
- Güvenli kullanıcı kimlik doğrulama ve veri yönetimi
- Veri depolama ve yönetimi için MongoDB entegrasyonu

## Kullanılan Teknolojiler

### Frontend

- **React Native**: Çapraz platform mobil uygulama geliştirme için
- **JavaScript**: Ön yüz için ana programlama dili

### Backend

- **Node.js**: Arka uç işlemlerini yönetmek için sunucu tarafı JavaScript çalışma zamanı
- **MongoDB**: Kullanıcı ve park verilerini depolamak için NoSQL veritabanı
- **Bcrypt**: Kullanıcı parolalarını hashlemek için kütüphane
- **JWT (JSON Web Token)**: Güvenli kullanıcı kimlik doğrulama için

### Donanım

- **ESP32-CAM**: Park alanı görüntülerini yakalamak için kamera modülü olan mikrodenetleyici

### Derin Öğrenme Modelleri

- **YOLOv8**: Görüntülerde park yerlerini tespit etmek için
- **CNN (Convolutional Neural Network)**: Park yerlerini dolu veya boş olarak sınıflandırmak için
