import { HttpError } from "../middlewares/errorHandler.js";
import {
  CreateEmployeeInput,
  EmployeeDocument,
} from "../models/employee.model.js";
import { IEmployeeRepository } from "../repository/employee.repository.js";

export class EmployeeService {
  private repository: IEmployeeRepository;

  constructor(repository: IEmployeeRepository) {
    this.repository = repository;
  }

  private validateInput(data: CreateEmployeeInput): void {
    const { name, position, baseSalary, yearsOfService } = data;

    if (!name || !position) {
      throw new HttpError(400, "Nombre y puesto son obligatorios");
    }

    if (typeof baseSalary !== "number" || baseSalary <= 0) {
      throw new HttpError(400, "El salario base debe ser mayor a 0");
    }

    if (
      typeof yearsOfService !== "number" ||
      yearsOfService < 0 ||
      !Number.isInteger(yearsOfService)
    ) {
      throw new HttpError(
        400,
        "La antigüedad debe ser un entero mayor o igual a 0",
      );
    }
  }

  private calculateFinalSalary(
    baseSalary: number,
    yearsOfService: number,
  ): number {
    const bonus = baseSalary * 0.02 * yearsOfService;
    return baseSalary + bonus;
  }

  async createEmployee(input: CreateEmployeeInput): Promise<EmployeeDocument> {
    this.validateInput(input);

    const finalSalary = this.calculateFinalSalary(
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
      `Empleado creado: ${employee.name} salario final: ${employee.finalSalary}`,
    );
    return employee;
  }

  async getAllEmployees(): Promise<EmployeeDocument[]> {
    return await this.repository.findAll();
  }

  async getEmployeeById(id: string): Promise<EmployeeDocument> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new HttpError(404, "Empleado no encontrado");
    }

    return employee;
  }
}
