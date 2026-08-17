import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import NhanVien from "../models/NhanVien.js";

export async function login(req, res) {
  try {
    const { MSNV, Password } = req.body;

    if (!MSNV || !Password) {
      return res.status(400).json({
        message: "Vui lòng nhập mã nhân viên và mật khẩu",
      });
    }

    const nhanVien = await NhanVien.findOne({ MSNV });

    if (!nhanVien) {
      return res.status(401).json({
        message: "Mã nhân viên hoặc mật khẩu không đúng",
      });
    }

    const isMatch = await bcrypt.compare(Password, nhanVien.Password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Mã nhân viên hoặc mật khẩu không đúng",
      });
    }

    const token = jwt.sign(
      {
        id: nhanVien._id,
        MSNV: nhanVien.MSNV,
        HoTenNV: nhanVien.HoTenNV,
        ChucVu: nhanVien.ChucVu,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: nhanVien._id,
        MSNV: nhanVien.MSNV,
        HoTenNV: nhanVien.HoTenNV,
        ChucVu: nhanVien.ChucVu,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Lỗi server",
    });
  }
}
