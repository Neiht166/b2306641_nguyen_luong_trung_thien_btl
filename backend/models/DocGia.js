import mongoose from "mongoose";

const schema = new mongoose.Schema({
  MaDocGia: { type: String, required: true, unique: true, trim: true },
  HoLot: { type: String, required: true, trim: true },
  Ten: { type: String, required: true, trim: true },
  NgaySinh: { type: Date, default: null },
  Phai: { type: String, enum: ["Nam", "Nữ", "Khác"], default: "Khác" },
  DiaChi: { type: String, default: "", trim: true },
  DienThoai: { type: String, default: "", trim: true }
}, { timestamps: true });

export default mongoose.model("DocGia", schema);
