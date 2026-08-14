import { Router } from "express";
import { getAll, getOne, create, update, remove } from "../controllers/crudController.js";

export function resourceRoutes(Model, populate = []) {
  const router = Router();
  router.get("/", getAll(Model, populate));
  router.get("/:id", getOne(Model, populate));
  router.post("/", create(Model));
  router.put("/:id", update(Model));
  router.delete("/:id", remove(Model));
  return router;
}
