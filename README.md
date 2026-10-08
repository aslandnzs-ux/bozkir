# Bozkır — Android sürümü

Bozkır, tarayıcıda çalışan bir koloni simülasyonudur. Bu depo oyunu **Capacitor** ile Android uygulamasına dönüştürür. Oyun yatay ekrana kilitli ve tam ekran açılır.

## En kolay yol: GitHub kendisi APK üretsin

1. GitHub'da yeni bir depo oluştur (örneğin `bozkir`).
2. Bu klasördeki **her şeyi** depoya yükle. Gizli `.github` klasörünü de yüklemeyi unutma; APK'yı o klasördeki iş akışı derliyor.
   - Bilgisayardan: `git init`, `git add .`, `git commit -m "Bozkır"`, `git branch -M main`, `git remote add origin <depo-adresi>`, `git push -u origin main`
   - Ya da GitHub sitesinde **Add file → Upload files** ile klasörü sürükle bırak.
3. Deponun **Actions** sekmesine gir. "Android APK" iş akışı kendiliğinden başlar (yaklaşık 5–8 dakika). Başlamazsa **Run workflow** düğmesine bas.
4. İş yeşil tik alınca çalışmaya tıkla. En altta **Artifacts → bozkir-apk** dosyasını indir ve zip'ten `app-debug.apk` dosyasını çıkar.
5. APK'yı telefona at ve aç. Android "bilinmeyen kaynak" izni isterse ver. Kurulum bu kadar.

## Bilgisayarda Android Studio ile

Gerekenler: Node.js 20, JDK 17, Android Studio.

```bash
npm install
npm run android:hazirla   # android/ klasörünü üretir, yatay ekran ve simgeleri ayarlar
npm run android:ac        # Android Studio'da açar, telefonunu bağlayıp Çalıştır'a bas
```

Oyunu (`www/index.html`) güncellediğinde `npm run android:esitle` yeterli.

## Notlar

- Kayıtlar telefonda saklanır. Uygulamayı arka plana atınca oyun otomatik kaydeder.
- Telefonun **geri** tuşu önce açık pencereyi, sonra menüyü kapatır; oyundan çıkarmaz.
- Üretilen APK hata ayıklama (debug) imzalıdır. Google Play'e yüklemek için imzalı sürüm (`assembleRelease`) ve bir anahtar deposu gerekir.
- İnternet yoksa oyun yazı tipi olarak telefonun kendi dar yazı tipini kullanır; oyun tamamen çevrimdışı çalışır.
