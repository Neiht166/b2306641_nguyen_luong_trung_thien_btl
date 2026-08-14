import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import NhaXuatBan from "./models/NhaXuatBan.js";
import Sach from "./models/Sach.js";
import DocGia from "./models/DocGia.js";
import NhanVien from "./models/NhanVien.js";
import TheoDoiMuonSach from "./models/TheoDoiMuonSach.js";
import { resourceRoutes } from "./routes/resourceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ message: "API QuanLyMuonSach đang hoạt động" }));

app.use("/api/nhaxuatban", resourceRoutes(NhaXuatBan));
app.use("/api/sach", resourceRoutes(Sach, ["nhaXuatBan"]));
app.use("/api/docgia", resourceRoutes(DocGia));
app.use("/api/nhanvien", resourceRoutes(NhanVien));
app.use("/api/muon-sach", borrowRoutes);
app.use("/api/muon-sach", resourceRoutes(TheoDoiMuonSach, ["docGia", "sach"]));
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend: http://localhost:${PORT}`));
