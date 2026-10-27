import { Schema, model, HydratedDocument } from "mongoose";

export interface CreateEmployeeInput {
  name: string;
  position: string;
  baseSalary: number;
  yearsOfService: number;
}

export interface IEmployee extends CreateEmployeeInput {
  finalSalary: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EmployeeDocument = HydratedDocument<IEmployee>;

const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    baseSalary: { type: Number, required: true },
    yearsOfService: { type: Number, required: true },
    finalSalary: { type: Number, required: true },
  },
  { timestamps: true },
);

export const EmployeeModel = model<IEmployee>("Employee", employeeSchema);
