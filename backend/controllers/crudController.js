export const getAll = (Model, populate = []) => async (req, res) => {
  try {
    let query = Model.find().sort({ createdAt: -1 });
    for (const field of populate) query = query.populate(field);
    res.json(await query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = (Model, populate = []) => async (req, res) => {
  try {
    let query = Model.findById(req.params.id);
    for (const field of populate) query = query.populate(field);
    const item = await query;
    if (!item) return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const create = (Model) => async (req, res) => {
  try {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const update = (Model) => async (req, res) => {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!item) return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = (Model) => async (req, res) => {
  try {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
    res.json({ message: "Xóa thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
