import { HttpError } from "../errors/HttpError.js";
import { CreateEmployeeInput } from "../models/employee.model.js";

export const validateCreateEmployeeInput = (data: CreateEmployeeInput): void => {
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
    throw new HttpError(400, "La antigüedad debe ser un entero mayor o igual a 0");
  }
};
