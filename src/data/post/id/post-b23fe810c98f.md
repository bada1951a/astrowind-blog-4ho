---
title: "Panduan Perplexity Pro Search untuk Riset Paten dan Akademik"
description: "Susun pencarian Perplexity yang lebih terarah untuk menelusuri literatur dan paten, lalu verifikasi sumber sebelum menarik kesimpulan."
publishDate: 2026-10-31T10:30:00.000Z
image: "https://picsum.photos/seed/prompt-mvwak8tr-10-c/1200/675.jpg"
category: "Prompt Engineering"
tags: ["Prompt Engineering","ChatGPT","Claude","AI Generatif"]
theme: "Industrial Blueprint"
---

## 1. Mulai dari pertanyaan riset, bukan nama teknologi

Saat menilai apakah suatu pendekatan sudah pernah diteliti atau dipatenkan, nama produk saja jarang cukup. Istilah yang dipakai peneliti dapat berbeda dari istilah dalam klaim paten; dokumen juga mungkin menggunakan sinonim, nama bahan, atau deskripsi fungsi. Pertanyaan pentingnya bukan sekadar “apa yang ditemukan?”, melainkan “sumber apa yang mendukung temuan ini, dan apa yang belum bisa disimpulkan?”

Perplexity Pro Search dapat membantu menelusuri pertanyaan dengan pencarian bertahap dan merangkum sumber yang ditemukan. Namun, saya akan memperlakukannya sebagai alat penemuan dan pemetaan awal, bukan pengganti pemeriksaan artikel ilmiah, basis data paten, atau nasihat profesional. Untuk riset di Indonesia, konteks seperti istilah teknis berbahasa Inggris, publikasi lokal, dan dokumen paten lintas negara perlu diperhatikan sejak awal.



![How to Use Perplexity Pro Search Prompts for Deep Patent and Academic Research Prompt Guide](https://picsum.photos/seed/prompt-mvwak8tr-10-b/1000/550.jpg)

## 2. Pahami apa yang dapat dan tidak dapat dibuktikan

Pencarian akademik dan pencarian paten menjawab pertanyaan yang berkaitan, tetapi berbeda. Artikel ilmiah dapat membantu menilai metode, hasil, dan keterbatasan suatu penelitian. Dokumen paten memuat informasi mengenai invensi dan klaim yang diajukan; keberadaan dokumen bukan bukti bahwa produk telah digunakan luas, bahwa invensi terbukti efektif, atau bahwa paten masih berlaku.

Hasil pencarian juga bergantung pada kata kunci, bahasa, cakupan sumber, serta dokumen yang tersedia. Karena itu, ringkasan AI bisa melewatkan istilah alternatif, mencampur beberapa versi artikel, atau memberi kesan bahwa daftar hasil sudah lengkap. Kutipan sumber membantu penelusuran, tetapi tidak otomatis memastikan bahwa setiap kalimat ringkasan didukung secara tepat.

Saya akan memisahkan tujuan pencarian sebelum menulis prompt:

- Untuk literatur: cari tinjauan sistematis, artikel penelitian, metode, hasil, dan batasan.
- Untuk paten: cari nomor publikasi, tanggal, pemohon, status yang tercantum, keluarga paten, serta klaim.
- Untuk perbandingan: minta pemisahan jelas antara temuan akademik dan informasi paten.

Status hukum paten perlu diperiksa di sumber resmi yang sesuai yurisdiksi. Untuk Indonesia, penelusuran dapat dimulai melalui Pangkalan Data Kekayaan Intelektual DJKI; untuk dokumen internasional, basis data seperti WIPO PATENTSCOPE atau Espacenet dapat membantu. Ketersediaan dan pembaruan data berbeda, jadi catat tanggal pemeriksaan.

## 3. Susun prompt yang bisa ditelusuri ulang

Prompt yang efektif menyebutkan pertanyaan, batas ruang lingkup, jenis sumber, dan bentuk hasil yang diinginkan. Saya juga akan meminta sistem menandai hal yang tidak ditemukan, alih-alih mengisi kekosongan dengan dugaan.

Gunakan pola berikut, lalu ganti bagian dalam kurung siku:

`Telusuri [masalah atau teknologi] untuk konteks [bidang/penggunaan]. Cari literatur akademik dan dokumen paten secara terpisah. Prioritaskan [rentang tahun, wilayah, atau jenis sumber]. Untuk setiap sumber, tampilkan judul, penulis atau pemohon, tahun, tautan, dan jenis dokumen. Ringkas metode atau klaim yang relevan, bukti yang tersedia, serta keterbatasannya. Bedakan fakta dari interpretasi. Jangan menyimpulkan kebaruan atau status hukum paten tanpa bukti langsung; tandai informasi yang belum dapat diverifikasi.`

Lanjutkan dengan pertanyaan yang lebih sempit, misalnya:

1. `Istilah dan sinonim apa yang dipakai dalam sumber untuk [teknologi]?`
2. `Artikel mana yang benar-benar menguji [hasil tertentu], dan metode apa yang digunakan?`
3. `Dokumen paten mana yang memuat [fitur teknis]? Tunjukkan nomor publikasi dan bagian klaim yang relevan.`
4. `Apa perbedaan antara hasil penelitian dan klaim dalam dokumen paten yang ditemukan?`

Untuk topik teknis, sertakan sinonim bahasa Inggris jika lazim dipakai dalam publikasi atau paten. Hindari meminta satu jawaban besar seperti “apakah teknologi ini baru?”; pecah menjadi pencarian literatur, identifikasi dokumen, dan pemeriksaan klaim. Jika opsi fokus sumber tersedia di antarmuka, pilih sesuai kebutuhan dan periksa dokumentasi Perplexity untuk mengetahui cakupannya saat ini.

## 4. Verifikasi sebelum mengutip atau mengambil keputusan

Saya akan membuka sumber asli, bukan hanya mengandalkan ringkasan. Pada artikel, cocokkan judul, penulis, tahun, jurnal, DOI, abstrak, metode, dan bagian hasil. Bedakan artikel jurnal dari pracetak, abstrak konferensi, ulasan, dan halaman sekunder. Jika dua sumber tampak membahas penelitian yang sama, periksa apakah salah satunya versi awal atau publikasi berbeda.

Pada paten, catat nomor publikasi dan negara atau kantor paten. Baca abstrak untuk orientasi, tetapi jangan menyamakan abstrak dengan cakupan hukum: klaim adalah bagian penting untuk memahami apa yang diminta perlindungannya. Periksa tanggal, keluarga dokumen, dan status melalui basis data resmi yang relevan. Pencarian cepat tidak cukup untuk memastikan kebebasan beroperasi, validitas paten, atau kebaruan invensi; pertanyaan tersebut mungkin membutuhkan pencarian profesional dan penilaian hukum.

Waspadai prompt yang meminta “semua paten” tanpa batas negara atau tanggal. Lebih baik tetapkan yurisdiksi, periode, dan istilah, lalu ulangi pencarian dengan sinonim. Simpan kueri, tanggal pencarian, tautan, dan alasan memilih sumber agar hasil dapat diperiksa kembali. Jika sumber tidak mendukung klaim ringkasan, koreksi catatan riset—jangan mempertahankan kesimpulan hanya karena jawaban terdengar meyakinkan.

## 5. Pertanyaan yang sering muncul

**Q1.** Apakah Perplexity bisa memastikan suatu teknologi belum pernah dipatenkan?

**A1.** Tidak dengan sendirinya. Hasilnya dapat membantu menemukan dokumen, tetapi pencarian mungkin tidak mencakup semua istilah, negara, atau basis data. Jangan menyimpulkan kebaruan hanya dari hasil yang tidak muncul; periksa basis data paten dan dokumen terkait.

**Q2.** Apakah tautan dan sitasi dalam jawaban cukup untuk artikel akademik?

**A2.** Jadikan itu petunjuk awal. Buka artikel atau halaman penerbit dan cocokkan identitas bibliografis, isi, serta bagian yang mendukung klaim. Perhatikan apakah sumbernya artikel penelitian, ulasan, pracetak, atau hanya ringkasan.

**Q3.** Bagaimana membandingkan artikel penelitian dengan klaim paten?

**A3.** Pisahkan keduanya dalam tabel: sumber dan tanggal; metode atau fitur yang dibahas; bukti atau klaim yang relevan; serta batasannya. Artikel melaporkan penelitian, sedangkan dokumen paten memuat klaim invensi. Keduanya tidak otomatis membuktikan hal yang sama.
