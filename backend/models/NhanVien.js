import mongoose from "mongoose";

const schema = new mongoose.Schema({
  MSNV: { type: String, required: true, unique: true, trim: true },
  HoTenNV: { type: String, required: true, trim: true },
  Password: { type: String, required: true },
  ChucVu: { type: String, default: "Nhân viên", trim: true },
  DiaChi: { type: String, default: "", trim: true },
  SoDienThoai: { type: String, default: "", trim: true }
}, { timestamps: true });

export default mongoose.model("NhanVien", schema);
