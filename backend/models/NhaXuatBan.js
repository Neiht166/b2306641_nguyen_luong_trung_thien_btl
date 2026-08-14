import mongoose from "mongoose";

const schema = new mongoose.Schema({
  MaNXB: { type: String, required: true, unique: true, trim: true },
  TenNXB: { type: String, required: true, trim: true },
  DiaChi: { type: String, default: "", trim: true }
}, { timestamps: true });

export default mongoose.model("NhaXuatBan", schema);
