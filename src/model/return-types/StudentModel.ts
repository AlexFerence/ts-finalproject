import { Model, DataTypes } from "sequelize";
import db from "../../config/database.config";

export interface StudentModel {
    uuid: string,
    studentID: string,
    firstName: string,
    lastName: string,
    email: string,
}

export class StudentModelInstance extends Model<StudentModel> { }

