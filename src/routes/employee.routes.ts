import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller.js";

export const createEmployeeRouter = (
  controller: EmployeeController,
): Router => {
  const router = Router();

  router.post("/", controller.create);
  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);

  return router;
};
