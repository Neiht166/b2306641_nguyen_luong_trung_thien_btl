import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  getAll,
  getOne,
  create,
  update,
  remove,
} from "../controllers/crudController.js";

export function resourceRoutes(Model, populate = []) {
  const router = Router();


  const uploadDir = path.join(process.cwd(), "uploads", "sach");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
      recursive: true,
    });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);

      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

      cb(null, filename);
    },
  });

  const upload = multer({
    storage,

    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Chỉ được upload file hình ảnh"));
      }
    },

    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });


  router.get("/", getAll(Model, populate));

  router.get("/:id", getOne(Model, populate));

  
  router.post("/", upload.single("HinhAnhFile"), create(Model));

 
  router.put("/:id", upload.single("HinhAnhFile"), update(Model));

  router.delete("/:id", remove(Model));

  return router;
}
