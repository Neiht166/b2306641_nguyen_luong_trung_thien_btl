import { Router } from "express";
import Sach from "../models/Sach.js";
import DocGia from "../models/DocGia.js";
import NhaXuatBan from "../models/NhaXuatBan.js";
import NhanVien from "../models/NhanVien.js";
import TheoDoiMuonSach from "../models/TheoDoiMuonSach.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const [books, readers, publishers, employees, borrows, activeBorrows] =
      await Promise.all([
        Sach.countDocuments(),
        DocGia.countDocuments(),
        NhaXuatBan.countDocuments(),
        NhanVien.countDocuments(),
        TheoDoiMuonSach.countDocuments(),
        TheoDoiMuonSach.countDocuments({ NgayTra: null })
      ]);

    res.json({ books, readers, publishers, employees, borrows, activeBorrows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
