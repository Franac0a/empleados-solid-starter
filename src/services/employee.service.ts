import { HttpError } from "../errors/HttpError.js";
import {
  CreateEmployeeInput,
  EmployeeDocument,
} from "../models/employee.model.js";
import { IEmployeeRepository } from "../repository/employee.repository.js";
import { calculateFinalSalary } from "../utils/salary.js";
import { validateCreateEmployeeInput } from "../validators/employee.validator.js";

export interface IEmployeeService {
  createEmployee(input: CreateEmployeeInput): Promise<EmployeeDocument>;
  getAllEmployees(): Promise<EmployeeDocument[]>;
  getEmployeeById(id: string): Promise<EmployeeDocument>;
}

export class EmployeeService implements IEmployeeService {
  constructor(private readonly repository: IEmployeeRepository) {}

  async createEmployee(input: CreateEmployeeInput): Promise<EmployeeDocument> {
    validateCreateEmployeeInput(input);

    const finalSalary = calculateFinalSalary(
      input.baseSalary,
      input.yearsOfService,
    );

    const employee = await this.repository.create({
      name: input.name,
      position: input.position,
      baseSalary: input.baseSalary,
      yearsOfService: input.yearsOfService,
      finalSalary,
    });

    console.log(
      `Empleado creado: ${employee.name} - salario final: ${employee.finalSalary}`,
    );
    return employee;
  }

  async getAllEmployees(): Promise<EmployeeDocument[]> {
    return this.repository.findAll();
  }

  async getEmployeeById(id: string): Promise<EmployeeDocument> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new HttpError(404, "Empleado no encontrado");
    }

    return employee;
  }
}
