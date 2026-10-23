---
title: "Panduan Midjourney V6: Menjaga Konsistensi Wajah Karakter di 20 Adegan"
description: "Strategi praktis prompt engineering Midjourney V6 untuk menjaga konsistensi wajah karakter dalam 20 adegan konten bisnis."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpeodr-10-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Midjourney V6", "Prompt Engineering", "Otomatisasi Konten", "AI Art"]
theme: "Cobalt Enterprise Lab"
---


Jam 8 malam di kawasan bisnis Jakarta, klien besar dari sektor perbankan menolak mentah-mentah seluruh storyboard visual kampanye pemasaran kami. Masalahnya klise namun fatal: karakter utama wanita berhijab yang menjadi ikon produk terlihat seperti orang yang berbeda di setiap adegan. Pada adegan pertama dia berwajah tirus, di adegan kelima matanya berubah warna, dan di adegan kesepuluh gaya rambut serta struktur tulangnya sama sekali tidak dikenali. Tenggat waktu presentasi tinggal 12 jam lagi, dan tim desain kami sudah kehabisan waktu untuk melakukan *inpainting* manual satu per satu pada 20 aset gambar yang dibutuhkan.

Di sinilah letak jebakan umum para kreator dan praktisi AI. Selama ini, banyak yang mengandalkan deskripsi teks generik tanpa memahami struktur parameter inti di Midjourney V6. Akibatnya, setiap kali kita menghasilkan gambar baru dengan skenario latar belakang berbeda, mesin kecerdasan buatan akan mereset fitur wajah dari titik nol. Hal ini tentu membuang banyak waktu, menguras kuota *fast hours*, dan menaikkan tingkat stres tim di kantor.

![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpeodr-10-b/1000/550.jpg)

Untuk keluar dari krisis ini, kita membutuhkan arsitektur *prompt* yang menggabungkan parameter `--cref` (Character Reference), penguncian parameter `--cw` (Character Weight), serta deskripsi antropometrik yang spesifik. Mari kita bedah cara kerjanya secara taktis agar Anda bisa langsung menerapkannya di ruang kerja Anda. <div style="border-left: 4px solid #1e40af; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Catatan Lab Enterprise:</strong> Penggunaan parameter referensi karakter yang tepat mampu memangkas waktu produksi visual hingga 70 persen serta menghemat anggaran operasional agensi hingga jutaan rupiah per proyek.
</div>

### Akar Masalah dan Arsitektur Solusi

Mengapa *prompt* sederhana seperti "a business woman smiling in an office" selalu gagal menjaga konsistensi? Karena Midjourney memperlakukan setiap baris perintah baru sebagai probabilitas acak baru. Model V6 memiliki pemahaman bahasa yang jauh lebih tajam, namun tanpa jangkar visual yang konsisten, ia tetap akan berimprovisasi pada struktur wajah.

Solusinya adalah pendekatan 3 lapis:
1. Jangkar Visual Primer: Menggunakan tautan gambar referensi karakter utama (*Master Seed Image*).

2. Bobot Karakter Mutlak: Mengatur parameter `--cw 100` agar mesin meniru seluruh elemen wajah, bukan hanya pakaian atau gaya rambutnya saja.

3. Deskripsi Token Konsisten: Mempertahankan frasa kunci deskripsi fisik yang identik di setiap variasi adegan.

### Template Master Prompt V6

Salin templat di bawah ini dan sesuaikan variabel di dalam tanda kurung siku sesuai dengan kebutuhan narasi konten Anda. ```markdown
[Deskripsi Adegan / Latar Belakang], a professional Indonesian woman in her late 20s, sharp jawline, almond-shaped dark eyes, neat office attire, working in a modern Jakarta skyscraper office, cinematic lighting, photorealistic --ar 16:9 --v 6.0 --cref [URL_GAMBAR_KARAKTER_UTAMA] --cw 100
```

<div style="border-left: 4px solid #1e40af; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Tips Eksekusi Cepat:</strong> 
<br>1. Buat satu gambar wajah tampak depan yang sempurna sebagai basis utama (Master Seed).
<br>2. Salin tautan (URL) gambar tersebut dan masukkan ke dalam parameter <code>--cref</code> pada setiap pembuatan 20 adegan selanjutnya. <br>3. Pastikan nilai <code>--cw</code> diset ke 100 agar bentuk wajah, hidung, dan mata tidak bergeser drastis.
</div>

### Variasi Penerapan untuk 20 Adegan Konten

Dalam implementasinya di lapangan, Anda hanya perlu mengubah bagian awal *prompt* (deskripsi adegan) sementara bagian belakang yang memuat parameter konsistensi tetap sama persis. Berikut adalah perbandingan struktur untuk 3 skenario berbed

a:

* Adegan Pagi (Briefing):
  `Morning briefing in a boardroom, a professional Indonesian woman in her late 20s... --cref [URL] --cw 100 --v 6.0`
* Adegan Siang (Analisis Data):
  `Analyzing financial charts on dual monitors, a professional Indonesian woman in her late 20s... --cref [URL] --cw 100 --v 6.0`
* Adegan Sore (Presentasi Klien):
  `Presenting marketing strategy on a large LED screen, a professional Indonesian woman in her late 20s... --cref [URL] --cw 100 --v 6.0`

Dengan menjaga struktur ini tetap kaku pada bagian parameter dan fleksibel pada bagian aksi, karakter Anda akan terlihat seperti orang yang benar-benar sama sedang menjalani aktivitas harian di kantor.

---

### Tanya Jawab (FAQ)

1. Apakah parameter --cref bisa digunakan untuk menggabungkan dua karakter sekaligus dalam satu adegan?
Hingga saat ini, parameter `--cref` di Midjourney V6 dirancang optimal untuk satu referensi karakter utama. Jika Anda membutuhkan dua karakter konsisten, disarankan untuk membuat komposisi secara terpisah atau menggunakan teknik *image blending* lanjutan di luar Midjourney.

2. Mengapa wajah karakter terkadang sedikit berubah meskipun saya sudah menggunakan --cw 100?
Perubahan kecil bisa terjadi jika latar belakang atau sudut pencahayaan (*lighting*) dalam *prompt* terlalu ekstrem dan kontras. Pastikan Anda mempertahankan kata kunci pencahayaan yang serupa di setiap adegan untuk membantu konsistensi model V6.

3. Bagaimana cara menghemat waktu saat harus menghasilkan 20 adegan sekaligus?
Gunakan fitur *Variable Prompting* di Midjourney atau siapkan daftar *prompt* di dalam dokumen teks, lalu salin dan tempel secara berurutan menggunakan mode *Fast Hours* agar proses render berjalan tanpa jeda lama. 