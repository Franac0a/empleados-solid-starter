import { Request, Response, NextFunction } from "express";
import { IEmployeeService } from "../services/employee.service.js";

export class EmployeeController {
  private service: IEmployeeService;

  constructor(service: IEmployeeService) {
    this.service = service;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, position, baseSalary, yearsOfService } = req.body;
      const employee = await this.service.createEmployee({
        name,
        position,
        baseSalary,
        yearsOfService,
      });
      return res.status(201).json(employee);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await this.service.getAllEmployees();
      return res.json(employees);
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const employee = await this.service.getEmployeeById(req.params.id);
      return res.json(employee);
    } catch (error) {
      next(error);
    }
  };
}
