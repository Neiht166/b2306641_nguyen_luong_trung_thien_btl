import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Bạn chưa đăng nhập",
    });
  }

  if (req.user.ChucVu !== "Quản trị viên") {
    return res.status(403).json({
      message: "Bạn không có quyền thực hiện chức năng này",
    });
  }

  next();
}
