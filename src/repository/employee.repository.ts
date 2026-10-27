import {
  EmployeeModel,
  IEmployee,
  EmployeeDocument,
} from "../models/employee.model.js";

export interface IEmployeeRepository {
  create(data: IEmployee): Promise<EmployeeDocument>;
  findAll(): Promise<EmployeeDocument[]>;
  findById(id: string): Promise<EmployeeDocument | null>;
}

export class EmployeeRepository implements IEmployeeRepository {
  async create(data: IEmployee): Promise<EmployeeDocument> {
    return await EmployeeModel.create(data);
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return await EmployeeModel.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<EmployeeDocument | null> {
    return await EmployeeModel.findById(id);
  }
}
