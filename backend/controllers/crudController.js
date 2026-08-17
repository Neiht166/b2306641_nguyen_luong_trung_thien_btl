import bcrypt from "bcrypt";

export const getAll =
  (Model, populate = []) =>
  async (req, res) => {
    try {
      let query = Model.find().sort({ createdAt: -1 });

      for (const field of populate) {
        query = query.populate(field);
      }

      res.json(await query);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getOne =
  (Model, populate = []) =>
  async (req, res) => {
    try {
      let query = Model.findById(req.params.id);

      for (const field of populate) {
        query = query.populate(field);
      }

      const item = await query;

      if (!item) {
        return res.status(404).json({
          message: "Không tìm thấy dữ liệu",
        });
      }

      res.json(item);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const create = (Model) => async (req, res) => {
  try {
    // KIỂM TRA DỮ LIỆU NHẬN ĐƯỢC
    console.log("========== CREATE ==========");
    console.log("MODEL:", Model.modelName);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const data = {
      ...req.body,
    };

    if (Model.modelName === "NhanVien" && data.Password) {
      data.Password = await bcrypt.hash(data.Password, 10);
    }

    // Nếu có ảnh thì lưu đường dẫn ảnh
    if (req.file) {
      data.HinhAnh = `/uploads/sach/${req.file.filename}`;

      console.log("Đường dẫn ảnh:", data.HinhAnh);
    } else {
      console.log("KHÔNG NHẬN ĐƯỢC FILE ẢNH");
    }

    console.log("DATA LƯU MONGODB:", data);

    const item = await Model.create(data);

    const result = item.toObject();

    if (Model.modelName === "NhanVien") {
      delete result.Password;
    }

    res.status(201).json(result);
  } catch (error) {
    console.error("CREATE ERROR:", error);

    res.status(400).json({
      message: error.message,
    });
  }
};

export const update = (Model) => async (req, res) => {
  try {
    // KIỂM TRA DỮ LIỆU NHẬN ĐƯỢC
    console.log("========== UPDATE ==========");
    console.log("MODEL:", Model.modelName);
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const data = {
      ...req.body,
    };

    if (Model.modelName === "NhanVien" && data.Password) {
      data.Password = await bcrypt.hash(data.Password, 10);
    }

    // Nếu chọn ảnh mới
    if (req.file) {
      data.HinhAnh = `/uploads/sach/${req.file.filename}`;

      console.log("Ảnh mới:", data.HinhAnh);
    } else {
      console.log("Không chọn ảnh mới");
    }

    console.log("DATA UPDATE:", data);

    const item = await Model.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        message: "Không tìm thấy dữ liệu",
      });
    }

    const result = item.toObject();

    if (Model.modelName === "NhanVien") {
      delete result.Password;
    }

    res.json(result);
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = (Model) => async (req, res) => {
  try {
    const item = await Model.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        message: "Không tìm thấy dữ liệu",
      });
    }

    res.json({
      message: "Xóa thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
