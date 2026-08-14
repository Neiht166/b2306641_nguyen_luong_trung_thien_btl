import mongoose from "mongoose";

const schema = new mongoose.Schema({
  MaDocGia: { type: String, required: true, trim: true },
  MaSach: { type: String, required: true, trim: true },
  NgayMuon: { type: Date, required: true },
  NgayTra: { type: Date, default: null },
  docGia: { type: mongoose.Schema.Types.ObjectId, ref: "DocGia", default: null },
  sach: { type: mongoose.Schema.Types.ObjectId, ref: "Sach", default: null }
}, { timestamps: true });

export default mongoose.model("TheoDoiMuonSach", schema);
