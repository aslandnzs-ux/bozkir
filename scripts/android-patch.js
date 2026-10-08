// Capacitor'un ürettiği Android projesini Bozkır için ayarlar:
// yatay ekran kilidi, tam ekran tema, uygulama simgeleri.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const main = path.join(root, 'android/app/src/main');
if (!fs.existsSync(main)) { console.error('android/ klasörü yok. Önce: npx cap add android'); process.exit(1); }

// 1) Yatay ekran
const manPath = path.join(main, 'AndroidManifest.xml');
let man = fs.readFileSync(manPath, 'utf8');
if (!man.includes('android:screenOrientation')) {
  man = man.replace(/<activity\b/, '<activity\n            android:screenOrientation="sensorLandscape"');
  fs.writeFileSync(manPath, man);
}

// 2) Tam ekran tema
const stylesPath = path.join(main, 'res/values/styles.xml');
if (fs.existsSync(stylesPath)) {
  let s = fs.readFileSync(stylesPath, 'utf8');
  if (!s.includes('android:windowFullscreen')) {
    s = s.replace(/(<style name="AppTheme\.NoActionBar"[^>]*>)/, '$1\n        <item name="android:windowFullscreen">true</item>');
    fs.writeFileSync(stylesPath, s);
  }
}

// 3) Simgeler
const res = path.join(main, 'res');
for (const d of ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi']) {
  const dir = path.join(res, 'mipmap-' + d);
  if (!fs.existsSync(dir)) continue;
  const pairs = [['ic_launcher.png', 'ic_launcher.png'], ['ic_launcher.png', 'ic_launcher_round.png'], ['ic_launcher_foreground.png', 'ic_launcher_foreground.png']];
  for (const [src, dst] of pairs) {
    const s = path.join(root, 'resources/android', d, src);
    if (fs.existsSync(s)) fs.copyFileSync(s, path.join(dir, dst));
  }
}
const bgPath = path.join(res, 'values/ic_launcher_background.xml');
fs.writeFileSync(bgPath, '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#1D2522</color>\n</resources>\n');
console.log('Bozkır Android ayarları uygulandı: yatay ekran, tam ekran, simgeler.');
