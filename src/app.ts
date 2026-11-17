import express, { Express } from "express";
import { EmployeeRepository } from "./repository/employee.repository.js";
import { EmployeeService } from "./services/employee.service.js";
import { EmployeeController } from "./controllers/employee.controller.js";
import { createEmployeeRouter } from "./routes/employee.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const createApp = (): Express => {
  const app = express();
  app.use(express.json());

  // Inyección de dependencias (composition root)
  const employeeRepository = new EmployeeRepository();
  const employeeService = new EmployeeService(employeeRepository);
  const employeeController = new EmployeeController(employeeService);

  app.use("/employees", createEmployeeRouter(employeeController));

  // Middleware centralizado de errores (siempre al final)
  app.use(errorHandler);

  return app;
};
