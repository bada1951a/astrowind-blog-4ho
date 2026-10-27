---
title: "BONGKAR SCRIPT YOUTUBE VIRAL: Cara Reverse Engineer Pakai Prompt AI"
description: "Pusing cari ide konten? Pakai prompt ChatGPT ini untuk bedah struktur script YouTube viral dalam hitungan detik. Praktis dan anti-ribet."
publishDate: 2026-10-20T21:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvgsw5ru-10-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "ChatGPT", "Claude", "YouTube Script", "AI Content"]
theme: "Forest Emerald Bio"
---

## 1. Situasi Kritis Akibat Halusinasi AI dan Output Menyesatkan

Jam 8 malam di sebuah gedung perkantoran di kawasan bisnis Jakarta. Klien utama kami baru saja menelepon dengan nada mendesak: *“Besok pagi kita harus meeting pitching konten, saya mau script video yang polanya mirip sama channel YouTube kompetitor yang lagi trending itu, tapi buat produk kita!”* Masalahnya, durasi video kompetitor tersebut ada 15 menit, dan saya sendirian harus merangkum hook, pacing, hingga psikologi audiensnya sebelum tengah malam. Kalau dikerjakan manual? Bisa subuh baru selesai.

<div style="border-left: 4px solid #10b981; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Catatan Kilat Produktivitas:</strong> Di era percepatan pembuatan konten dan ringkasan data dengan AI saat ini, mengandalkan kerja manual untuk bedah konten adalah cara tercepat untuk burnout. Kita butuh pendekatan <em>reverse engineering</em> yang sistematis.
</div>

![ChatGPT Prompt to Reverse Engineer Any Viral YouTube Script Structure Prompt Guide](https://picsum.photos/seed/prompt-mvgsw5ru-10-b/1000/550.jpg)

Awalnya, saya coba jalan pintas paling malas. Saya buka ChatGPT lalu mengetik prompt asal-asalan: *"Tolong buatkan ringkasan dari script YouTube ini."* Hasilnya? Hancur lebur. AI cuma memberikan ringkasan generik berbentuk paragraf biasa yang sama sekali tidak bisa dipakai untuk membedah formula retensi penonton, gaya bahasa, atau struktur *call-to-action* (CTA) mereka. Jelas itu cara yang salah.

Setelah eksperimen berdarah-darah, saya sadar kuncinya ada pada teknik *reverse engineering prompt structure*. AI butuh instruksi peran (role), batasan analisis, dan format output yang tegas agar bisa membedah anatomi sebuah video sukses tanpa halusinasi.

Berikut adalah master prompt siap pakai yang saya gunakan di ChatGPT, Claude, maupun Gemini untuk membongkar script YouTube viral dalam waktu kurang dari 2 menit.

### Master Prompt Template

Salin teks di dalam kotak kode di bawah ini, lalu ganti bagian di dalam kurung siku `[...]` dengan transkrip atau teks script video yang ingin Anda bedah.

```markdown
Role: Anda adalah seorang YouTube Growth Strategist dan Master Copywriter yang ahli dalam membedah psikologi penonton dan struktur retensi video.
Task: Lakukan reverse engineering secara mendalam terhadap transkrip script YouTube di bawah ini untuk menemukan formula viralnya. Input Transkrip:
"[Tempel transkrip atau teks script YouTube target di sini]"

Analisis berdasarkan kerangka berikut dan berikan output dalam format poin-poin yang terstruktur:
1. HOOK (0-30 detik): Kalimat apa yang dipakai untuk menghentikan penonton melakukan scroll? Apa teknik psikologisnya (fear, curiosity, arousing)?

2. PACING & STRUKTUR NARASI: Bagaimana transisi dari masalah ke solusi? Berapa segmen utama yang digunakan?

3. OPEN LOOPS & RETENTION TRICKS: Di bagian mana narator menahan informasi agar penonton terus menonton sampai habis?

4. CALL TO ACTION (CTA): Bagaimana cara mereka mengarah ke engagement atau konversi tanpa terdengar jualan kaku?

5. BLUEPRINT REPRODUKSI: Buat kerangka (outline) 5 poin praktis yang bisa saya pakai ulang untuk topik produk saya sendiri.

Batasan: Gunakan bahasa Indonesia yang profesional, tajam, dan langsung pada inti poin tanpa basa-basi pengantar yang panjang.
```

<div style="border-left: 4px solid #10b981; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Tips Eksekusi Lapangan:</strong> Jika transkrip videonya sangat panjang (di atas 10.000 kata), gunakan model AI berkapasitas konteks besar seperti Claude 3.5 Sonnet atau ChatGPT Plus (GPT-4o) agar analisis struktur tidak terpotong di tengah jalan.
</div>

### Tanya Jawab Cepat (FAQ)

**Q:** Apakah saya harus memasukkan seluruh isi transkrip video secara utuh?

**A:** Tidak harus semuanya. Untuk hasil terbaik dan hemat token, ambil bagian awal (0-3 menit pertama) tempat penentuan retensi, lalu bagian inti materi dan penutupnya.

**Q:** Apakah prompt ini bisa dipakai di Gemini atau Claude selain ChatGPT?

**A:** Sangat bisa. Struktur prompt berbasis peran (*role-based*) dan instruksi bernomor di atas sangat kompatibel dengan berbagai LLM modern di pasaran saat ini.

**Q:** Bagaimana jika video target tidak punya teks transkrip tertulis?

**A:** Anda bisa menggunakan ekstensi browser gratis untuk menyalin transkrip YouTube, atau mengunduh subtitle videonya terlebih dahulu sebelum memasukkannya ke dalam prompt.
