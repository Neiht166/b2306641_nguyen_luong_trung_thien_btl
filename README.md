# QuanLyMuonSach - MEVN

Website quản lý mượn sách xây dựng theo mô hình MEVN:

- MongoDB + Mongoose
- Express.js + Node.js
- Vue 3 + Vite
- Axios
- Vue Router
- Bootstrap 5

## 1. Cấu trúc

```text
QuanLyMuonSach_MEVN/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── views/
    │   ├── services/
    │   ├── router/
    │   ├── App.vue
    │   ├── main.js
    │   └── style.css
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```


## Chạy backend


Backend chạy tại:

`http://localhost:3000`


Frontend chạy tại:

`http://localhost:5173`

## Các collection

1. `docgias`
2. `sachs`
3. `nhaxuatbans`
4. `theodoimuonsachs`
5. `nhanviens`

Quan hệ được thể hiện bằng ObjectId reference:

- Sach -> NhaXuatBan
- TheoDoiMuonSach -> DocGia
- TheoDoiMuonSach -> Sach
- TheoDoiMuonSach -> NhanVien


## Chức năng

- Dashboard thống kê
- Quản lý sách
- Quản lý độc giả
- Quản lý nhà xuất bản
- Quản lý phiếu/theo dõi mượn sách
- Quản lý nhân viên
- Tìm kiếm và lọc dữ liệu
- Thêm / sửa / xóa
- Xem trạng thái sách đang mượn hoặc đã trả
