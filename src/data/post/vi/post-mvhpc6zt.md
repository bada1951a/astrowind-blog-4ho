---
title: "Bi quyết giữ nguyên khuôn mặt nhân vật qua 20 cảnh trong Midjourney V6"
description: "Hướng dẫn chi tiết cách dùng Midjourney V6 kết hợp ChatGPT và Claude để cố định khuôn mặt nhân vật qua nhiều cảnh quay mà không bị lệch nét."
publishDate: 2026-10-22T03:00:00.000Z
image: 'https://picsum.photos/seed/prompt-mvhpex8k-11-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tips"]
theme: "Matte Black stealth"
---

## 1. Tình huống khẩn cấp do AI trả lời ảo giác và sai lệch

Đồng hồ trên tường văn phòng ở Quận 1 điểm 11 giờ đêm, sếp đứng sau lưng thở dài giục dự án storyboard quảng cáo 20 cảnh. Mọi thứ đã chuẩn bị xong, nhưng khi ném đống prompt vào Midjourney V6 để tạo hình nhân vật chính cho chuỗi video, thảm họa xảy r

A. Cảnh 1 là một cô gái tóc ngắn cá tính, sang cảnh 2 bỗng biến thành một bà cô trung niên, sang cảnh 3 lại hóa thành hot girl Hàn Quốc mắt một mí. Gương mặt nhân vật nhảy múa loạn xạ qua từng khung hình, hoàn toàn không thể dùng được cho một chiến dịch thương mại nghiêm túc.

Thực tế, nguyên nhân thất bại rất rõ ràng: Vòng đời của một prompt thông thường trong Midjourney thiếu đi sự neo giữ cấu trúc sinh học của nhân vật. Khi bạn chỉ mô tả chung chung như "a young Vietnamese woman", thuật toán Diffusion của Midjourney sẽ tự do sáng tạo lại khuôn mặt ở mỗi lần render mới (seed khác nhau), dẫn đến hiện tượng hallucination hình ảnh trầm trọng. 

![Midjourney V6 Prompt Guide to Maintain Consistent Character Faces Across 20 Scenes Prompt Guide](https://picsum.photos/seed/prompt-mvhpex8k-11-b/1000/550.jpg)

Để giải quyết triệt để vấn đề này tại văn phòng, tôi đã xây dựng một quy trình phối hợp tự động hó

A. sử dụng ChatGPT và Claude để chuẩn hóa từ khóa cấu trúc khuôn mặt, kết hợp với các tham số đặc tả của Midjourney V6 như `--cref` và tham số trọng số chi tiết.

<div style="border-left: 4px solid #ffffff; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Mẹo thực chiến từ chuyên gi

A. </strong> Đừng bao giờ tạo 20 cảnh cùng lúc. Hãy tạo mẫu chuẩn (Master Image) cho nhân vật ở góc nhìn chính diện, sau đó khóa chặt URL của ảnh đó làm Character Reference cho toàn bộ các cảnh tiếp theo.
</div>

Dưới đây là cấu trúc Prompt chuẩn xác nhất được thiết kế riêng cho Midjourney V6, giúp bạn duy trì 95% độ nhận diện khuôn mặt qua 20 cảnh quay khác nhau.

```markdown
[Subject Identifier] + [Facial Blueprint] + [Expression & Action] + [Environment & Lighting] + [Camera Specs] + --cref [URL_Master_Image] --cw 100 --v 6.0 --ar 16:9
```

### Giải thích các biến cốt lõi:
- [Subject Identifier]: Định danh duy nhất cho nhân vật (Ví dụ: `A 25-year-old Vietnamese female graphic designer named Linh`).
- [Facial Blueprint]: Mô tả chi tiết hình học khuôn mặt để AI không bị trôi nét (`oval face, straight small nose, thin lips, shoulder-length blunt cut black hair with bangs, natural skin texture`).
- [Expression & Action]: Hành động và biểu cảm phù hợp với từng cảnh (`smiling gently while typing on a MacBook`).
- [Environment & Lighting]: Bối cảnh không gian và ánh sáng (`modern minimalist co-working space in Ho Chi Minh City, soft warm morning window light`).
- [Camera Specs]: Thông số máy ảnh giả lập để giữ chất lượng đồng đều (`shot on 35mm lens, f/1.8, photorealistic, cinematic lighting`).
- --cref [URL]: Tham chiếu hình ảnh khuôn mặt gốc.
- --cw 100: Mức độ giữ nguyên toàn bộ khuôn mặt và tóc từ ảnh gốc (giá trị từ 0 đến 100).

<div style="border-left: 4px solid #ffffff; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Cảnh báo quan trọng:</strong> Tham số `--cw 100` sẽ giữ lại cả kiểu tóc của nhân vật gốc. Nếu trong kịch bản cảnh 3 nhân vật phải đội mũ bảo hiểm hoặc buộc tóc, hãy giảm `--cw` xuống mức 50-60 để AI có không gian linh hoạt điều chỉnh kiểu tóc mà vẫn giữ cấu trúc xương mặt.
</div>

### Quy trình thực hiện tự động hóa hàng ngày qua Claude và ChatGPT:
1. Bước 1 (Lên kịch bản): Đưa toàn bộ kịch bản 20 cảnh vào Claude để phân tích hành động và bối cảnh từng phân đoạn.

2. Bước 2 (Tạo Master Prompt): Yêu cầu ChatGPT viết prompt cho bức ảnh gốc (Master Image) với mô tả khuôn mặt cực kỳ chi tiết.

3. Bước 3 (Render & Lấy Link): Chạy prompt gốc trên Midjourney V6, chọn bức hình đẹp nhất và copy Image Address.

4. Bước 4 (Nhân bản 20 cảnh): Ghép link vừa copy vào cú pháp `--cref [URL]` đi kèm với các bối cảnh khác nhau từ kịch bản của Claude.

---

### Các câu hỏi thường gặp (FAQ)

Q1. Tại sao tôi dùng --cref nhưng mặt nhân vật vẫn bị thay đổi nhẹ ở các góc chụp nghiêng?

A1. Midjourney V6 đôi khi gặp khó khăn khi chuyển từ góc chính diện sang góc nghiêng hoàn toàn (profile view). Để khắc phục, hãy tạo thêm 2 ảnh tham chiếu phụ (một góc nghiêng 45 độ và một góc nghiêng 90 độ) rồi đưa cả 3 URL vào tham số `--cref URL1 URL2 URL3` để AI có dữ liệu không gian 3 chiều tốt hơn.

Q2. Tôi có thể áp dụng cách này cho phong cách hoạt hình (Anime/3D) không hay chỉ hợp với tả thực (Photorealistic)?

A2. Hoàn toàn áp dụng được cho mọi phong cách. Với phong cách hoạt hình, bạn chỉ cần thay đổi từ khóa ở phần [Camera Specs] thành các thuật ngữ phong cách như `studio ghibli style, 3d Pixar style, octane render` và giữ nguyên cấu trúc mô tả khuôn mặt chi tiết.

Q3. Tôi nên làm gì khi tham số --cw 100 làm cho nhân vật ở các cảnh sau trông quá cứng nhắc, giống hệt nhau một cách máy móc?

A3. Đây là hiện tượng "over-fitting" của tham số trọng lượng. Hãy hạ giá trị `--cw` xuống mức 75 hoặc 80. Mức này vừa đủ để giữ lại thần thái và cấu trúc xương mặt đặc trưng, vừa cho phép Midjourney V6 tự do điều chỉnh biểu cảm cơ mặt theo từng ngữ cảnh vui, buồn, ngạc nhiên của kịch bản.
