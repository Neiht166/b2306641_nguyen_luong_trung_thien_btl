import { Router } from "express";
import TheoDoiMuonSach from "../models/TheoDoiMuonSach.js";
import DocGia from "../models/DocGia.js";
import Sach from "../models/Sach.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { MaDocGia, MaSach } = req.body;
    const [reader, book] = await Promise.all([
      DocGia.findOne({ MaDocGia }),
      Sach.findOne({ MaSach })
    ]);

    if (!reader) return res.status(400).json({ message: "Mã độc giả không tồn tại" });
    if (!book) return res.status(400).json({ message: "Mã sách không tồn tại" });
    if (book.SoQuyen <= 0) return res.status(400).json({ message: "Sách đã hết số lượng" });

    const record = await TheoDoiMuonSach.create({
      ...req.body,
      docGia: reader._id,
      sach: book._id,
      NgayMuon: req.body.NgayMuon || new Date()
    });

    book.SoQuyen -= 1;
    await book.save();

    res.status(201).json(await record.populate(["docGia", "sach"]));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id/return", async (req, res) => {
  try {
    const record = await TheoDoiMuonSach.findById(req.params.id);
    if (!record) return res.status(404).json({ message: "Không tìm thấy lượt mượn" });
    if (record.NgayTra) return res.status(400).json({ message: "Sách đã được trả" });

    record.NgayTra = req.body.NgayTra || new Date();
    await record.save();

    const book = await Sach.findOne({ MaSach: record.MaSach });
    if (book) {
      book.SoQuyen += 1;
      await book.save();
    }

    res.json(await record.populate(["docGia", "sach"]));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
