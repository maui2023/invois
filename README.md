# InVois

Sistem Invois HTML5 ringkas dan pantas tanpa pangkalan data (Serverless / No Database). Pengguna boleh terus menaip di atas kertas invois, menyimpan fail `data.json` ke dalam komputer atau telefon pintar sendiri, dan memuatkan semula data pada bila-bila masa.

---

## ✨ Ciri-Ciri Utama & Kemaskini Baharu

1. **Margin Kiri & Kanan Dikurangkan Separuh (Ruang Menulis Lebih Luas)**:
   - Margin kiri dan kanan pada saiz kertas A4 dikurangkan kepada **11mm** (separuh daripada sebelum ini).
   - Menambahkan ruang lebar boleh guna (*content width*) sehingga **188mm**, membolehkan lebih banyak teks penerangan dan alamat ditulis dengan selesa.

2. **Semua Tulisan Normal (Tiada Lagi Jarak Buatan)**:
   - Semua perkataan kini ditaip normal dan bersih (contohnya `TARIKH:`, `TARIKH TAMAT:`, `KEPADA`, `PENERANGAN`, `KUANTITI`, dsb.) tanpa penjarakan huruf berlebihan seperti `T A R I K H`.

3. **Sokongan Dwi-Bahasa Mengikut Invois (Bilingual Per-Invoice)**:
   - Disediakan butang penukar bahasa: **🇲🇾 Melayu | 🇬🇧 English** pada bar menu atas.
   - Pilihan bahasa disimpan secara individu di dalam setiap rekod invois (`inv.language`), bukan sekadar tetapan lalai global.
   - Anda boleh mempunyai **Invois A dalam English** dan **Invois B dalam Bahasa Melayu** dalam fail `data.json` yang sama.
   - Lalai (*default*) ditetapkan kepada **Bahasa Melayu** tulen tanpa percampuran bahasa (tiada istilah bercampur-aduk).

4. **Bebas Akses & Menaip Terus (WYSIWYG)**:
   - Klik mana-mana teks di atas kertas invois (Nama, Alamat, No Invois, Tarikh, Baris Item, Butiran Bank) untuk menaip terus.
   - Pengiraan automatik bagi setiap baris item (`Kuantiti × Harga Seunit`), `Subjumlah`, `Jumlah`, dan `Baki Perlu Dibayar` berasaskan amaun yang telah dibayar.
   - Tambah dan padam baris penerangan item secara fleksibel.
   - Tukar kod QR dengan memuat naik gambar dari peranti anda.

2. **Simpan ke PC / Telefon Pintar (`data.json`)**:
   - Butang **Simpan data.json** memuat turun keseluruhan senarai invois atau invois semasa terus ke peranti tanpa memerlukan akaun atau pangkalan data luaran.
   - Menggunakan format JSON standard yang boleh dibuka dan diedit pada bila-bila masa.
   - Disertakan salinan sandaran automatik dalam `localStorage` pelayar agar kerja anda tidak hilang sekiranya laman dimuat semula.

3. **Pengurus Data (Data Manager Interface)**:
   - Antara muka khusus untuk mengurus rekod-rekod yang dimuatkan dari `data.json`.
   - **Muat Semula / Load**: Muat invois terpilih ke paparan utama.
   - **Boleh Load Nama Sama**: Setiap invois dipadankan dengan ID unik dalaman, membolehkan anda memuat dan mengurus pelbagai invois dengan nama klien atau nombor invois yang serupa tanpa sebarang konflik.
   - **Pendua (Duplicate / Salin)**: Salin mana-mana invois sedia ada dengan satu klik untuk menjana invois baharu dengan cepat.
   - **Carian Pintas**: Tapis senarai mengikut nombor invois, nama klien, atau tarikh.

4. **Susun Atur & Cetakan Tepat (Layout & Cetakan PDF Standard A4)**:
   - Rekabentuk piksel demi piksel mematuhi templat standard invois profesional Malaysia (Inter / Plus Jakarta Sans).
   - Butang **Cetak / Simpan PDF** (atau pintasan `Ctrl + P`) akan membuka dialog cetakan pelayar dengan saiz A4 yang bersih tanpa butang atau elemen antaramuka.

---

## 🚀 Cara Penggunaan

### 1. Membuka Aplikasi
Anda boleh membuka fail `index.html` terus dalam mana-mana pelayar web (Chrome, Firefox, Safari, Edge) di PC atau telefon anda, atau jalankan pelayan HTTP ringkas:

```bash
# Contoh menggunakan Python
python3 -m http.server 8080
```
Buka pelayar web di: `http://localhost:8080`

### 2. Menyimpan Data
- Klik butang **Simpan data.json** pada bar menu atas untuk memuat turun fail sandaran ke dalam storan peranti anda.

### 3. Memuatkan Data Semula
- Klik **Muat data.json** dan pilih fail `data.json` yang telah disimpan sebelum ini.
- Invois akan dipaparkan dalam **Pengurus Data** di mana anda boleh memilih untuk memuatkan, menduplikasi, atau memadam rekod.

### 4. Menjana PDF
- Klik butang **Cetak / Simpan PDF** di bahagian atas kanan.
- Pada tetingkap cetakan pelayar:
  - **Destination**: Simpan sebagai PDF (*Save as PDF*)
  - **Paper Size**: A4
  - **Margins**: Minimum atau Default
  - **Options**: Tandakan *Background graphics* jika ingin mengekalkan warna kod QR dan garis sempadan.

---

## 📁 Struktur Fail

```
invois/
├── index.html              # Antaramuka utama & templat kertas A4
├── css/
│   └── style.css           # Sistem reka bentuk, tema gelap antaramuka & gaya cetakan A4
├── js/
│   └── app.js              # Logik pengiraan, pengurusan data.json, salinan & localStorage
├── assets/
│   └── aeon-qr-sample.svg  # Kod QR contoh DuitNow / AEON Bank
└── data/
    ├── sample-data.json    # Data sampel mengikut gambar rujukan
    └── multi-sample.json   # Contoh pelbagai invois untuk ujian salinan & nama sama
```
