import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaSach: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    TenSach: {
      type: String,
      required: true,
      trim: true,
    },

    HinhAnh: {
      type: String,
      default: "",
    },

    DonGia: {
      type: Number,
      required: true,
      min: 0,
    },

    SoQuyen: {
      type: Number,
      required: true,
      min: 0,
    },

    NamXuatBan: {
      type: Number,
      required: true,
    },

    MaNXB: {
      type: String,
      required: true,
      trim: true,
    },

    NguonGocTacGia: {
      type: String,
      default: "",
      trim: true,
    },

    nhaXuatBan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NhaXuatBan",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Sach", schema);
