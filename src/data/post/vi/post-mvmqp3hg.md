---
title: "Bí quyết viết Few-Shot Prompt trích xuất dữ liệu bảng từ văn bản hỗn độn"
description: "Hướng dẫn thực chiến giúp bạn dùng AI chuyển văn bản phi cấu trúc thành bảng dữ liệu sạch sẽ, loại bỏ hoàn toàn lỗi cú pháp cũ."
publishDate: 2026-10-25T03:55:00.000Z
image: 'https://picsum.photos/seed/prompt-mvmqr54s-11-c/1200/675.jpg'
category: 'Prompt Engineering'
tags: ["Prompt Engineering", "ChatGPT", "Claude", "AI Tips"]
theme: "Forest Emerald Bio"
---


## 1. [Opening Story/Problem]

Sáng nay tại tòa nhà văn phòng công nghệ cao ở Quận 1, TP. Hồ Chí Minh, đồng nghiệp của tôi đang ôm đầu than vãn vì hạn chót báo cáo kinh doanh chỉ còn đúng một tiếng nữa. Anh ấy vừa nhờ AI viết một đoạn mã Python đơn giản để cào và bóc tách dữ liệu từ file văn bản thô, nhưng kết quả nhận lại là một đống mã lỗi đỏ lòm. Nguyên nhân là vì con AI đã lấy nhầm tài liệu từ các thư viện cũ đã bị khai tử từ nhiều năm trước, cấu trúc hàm thì sai bét nhè.

Thay vì ngồi sửa từng dòng code cào dữ liệu thủ công mất thời gian, tôi bảo anh ấy dừng lại ngay. Vấn đề không nằm ở ngôn ngữ lập trình, mà nằm ở cách chúng ta yêu cầu AI xử lý văn bản phi cấu trúc thành bảng biểu. Nếu bạn cứ ném một cục văn bản hỗn độn vào ChatGPT hay Claude và bảo "Hãy tóm tắt thành bảng", kết quả nhận được chắc chắn sẽ là những định dạng lộn xộn, thiếu cột hoặc tự ý bịa thêm số liệu.

<div style="border-left: 4px solid #10b981; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Cảnh báo thực tế:</strong> Zero-shot prompting (chỉ ra lệnh suông mà không cho ví dụ mẫu) đối với dữ liệu phi cấu trúc phức tạp có tỷ lệ sai sót lên tới 70%. Kỹ thuật Few-Shot Learning là cứu cánh duy nhất để ép AI tuân thủ cấu trúc định dạng chuẩn xác.
</div>



![How to Write Few-Shot Prompts to Extract Tabular Data from Unstructured Text Prompt Guide](https://picsum.photos/seed/prompt-mvmqr54s-11-b/1000/550.jpg)

## 2. [Root Cause / Architecture]

Tại sao các mô hình ngôn ngữ lớn (LLM) thường thất bại khi trích xuất bảng dữ liệu từ văn bản thô? Lý do cốt lõi là các mô hình này dự đoán từ tiếp theo dựa trên xác suất thống kê. Khi gặp một định dạng văn bản không có cấu trúc rõ ràng (như biên bản họp, email hỗn hợp, báo cáo khảo sát dạng đoạn văn), AI không biết đâu là tiêu đề cột, đâu là giá trị hàng.

Kỹ thuật **Few-Shot Prompting** giải quyết bài toán này bằng cách cung cấp cho AI một vài mẫu ví dụ (Input và Output mong muốn) ngay trước khi đưa dữ liệu thực tế vào. Cấu trúc của một Few-Shot Prompt chuyên nghiệp bao gồm:

- **Vai trò (System Role):** Định nghĩa chuyên môn của AI (ví dụ: Chuyên gia phân tích dữ liệu).
- **Quy tắc trích xuất (Instructions):** Các ràng buộc nghiêm ngặt về định dạng, cách xử lý dữ liệu thiếu.
- **Ví dụ mẫu (Few-Shot Examples):** Cặp dữ liệu mẫu đầu vào (Input) và kết quả bảng mẫu (Output).
- **Dữ liệu đích (Target Data):** Phần văn bản thực tế cần xử lý.

## 3. [Master Prompt Template]

Dưới đây là khung prompt chuẩn mà tôi đang áp dụng hằng ngày tại văn phòng để ép Claude và ChatGPT trả về định dạng bảng Markdown hoặc JSON không bao giờ sai sót. Bạn chỉ cần sao chép và thay thế phần nội dung của mình.

```markdown
Role: Bạn là một chuyên gia xử lý dữ liệu và trích xuất thông tin cao cấp với độ chính xác tuyệt đối.

Task: Nhiệm vụ của bạn là đọc đoạn văn bản phi cấu trúc được cung cấp bên dưới và trích xuất thành một bảng dữ liệu chuẩn Markdown theo đúng các cột yêu cầu.

Columns Required:
1. Ma_Khach_Hang
2. Ten_Khach_Hang
3. San_Pham_Quan_Tam
4. Ngay_Lien_He

Rules:
- Chỉ trích xuất thông tin có thật trong văn bản. Tuyệt đối không tự bịa đặt (hallucination).
- Nếu dữ liệu nào không có, hãy điền là "N/A".
- Định dạng ngày tháng phải chuẩn theo dạng DD/MM/YYYY.

Examples:
=== Ví dụ mẫu 1 ===
Input: Khách hàng Nguyễn Văn A (Mã: KH001) đã gọi điện vào ngày 12 tháng 5 năm 2025 để hỏi về gói dịch vụ Cloud Server Pro.
Output:
| Ma_Khach_Hang | Ten_Khach_Hang | San_Pham_Quan_Tam | Ngay_Lien_He |
|---------------|----------------|-------------------|--------------|
| KH001 | Nguyễn Văn A | Cloud Server Pro | 12/05/2025 |

=== Kết thúc ví dụ ===

Target Data:
[Dán văn bản thô của bạn vào đây]

Output Format: Chỉ trả về bảng Markdown, không kèm theo bất kỳ lời chào hay giải thích nào khác.
```

## 4. [Practical Variations / Safety Tips]

Để tối ưu hóa hiệu suất khi xử lý khối lượng dữ liệu lớn tại nơi làm việc, bạn hãy ghi nhớ các mẹo thực chiến sau:

- **Xử lý văn bản quá dài:** Nếu văn bản vượt quá giới hạn cửa sổ ngữ cảnh, hãy chia nhỏ thành từng đoạn khoảng 1.000 từ và dùng cùng một khung prompt mẫu.
- **Ép kiểu dữ liệu xuất ra:** Nếu bạn cần đưa dữ liệu thẳng vào cơ sở dữ liệu hoặc Excel, hãy thay đổi phần `Output Format` thành định dạng JSON Array thay vì bảng Markdown.
- **Kiểm soát tính sáng tạo:** Luôn đặt thông số `Temperature` về mức thấp nhất (0.0 hoặc 0.1) nếu giao diện AI của bạn cho phép chỉnh sửa thông số này, giúp AI tập trung vào logic thay vì sáng tạo nội dung.

<div style="border-left: 4px solid #10b981; padding: 12px 16px; margin: 20px 0; background-color: rgba(0,0,0,0.03); border-radius: 4px; color: #111827;">
<strong>Mẹo tiết kiệm thời gian:</strong> Lưu mẫu prompt này vào phím tắt của trình duyệt hoặc phần mềm quản lý văn bản (như TextExpander). Khi cần, bạn chỉ mất 3 giây để gọi ra thay vì ngồi viết lại từ đầu.
</div>

## 5. Frequently Asked Questions

Q: Tôi phải làm sao nếu văn bản đầu vào có quá nhiều lỗi chính tả tiếng Việt?

A: Các mô hình AI hiện đại như GPT-4o hay Claude 3.5 Sonnet có khả năng tự động sửa lỗi chính tả ngữ cảnh rất tốt. Tuy nhiên, bạn nên bổ sung thêm một dòng vào phần Rules trong prompt: "Tự động chuẩn hóa lỗi chính tả tiếng Việt của tên riêng và sản phẩm trước khi đưa vào bảng".

Q: Khi nào nên dùng bảng Markdown và khi nào nên dùng định dạng CSV/JSON?

A: Hãy dùng bảng Markdown nếu bạn cần copy nhanh kết quả dán trực tiếp vào Notion, Confluence hoặc Google Docs. Hãy dùng định dạng JSON hoặc CSV nếu bạn có ý định viết một đoạn script nhỏ để tự động hóa việc đẩy dữ liệu vào database.

Q: Tại sao AI vẫn thỉnh thoảng bỏ sót một vài dòng dữ liệu trong văn bản dài?

A: Đó là do hiện tượng "Lost in the Middle" của các mô hình ngôn ngữ khi xử lý văn bản dài. Giải pháp tốt nhất là cung cấp từ 2 đến 3 ví dụ mẫu rõ ràng ở phần Few-Shot Examples và yêu cầu AI rà soát lại toàn bộ văn bản theo từng đoạn nhỏ trước khi xuất bảng cuối cùng.
