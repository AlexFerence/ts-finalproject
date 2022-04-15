import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface StudentInfoType {
    uuid: string,
    studentID: string
}

export class StudentInfoInstance extends Model<StudentInfoType> { }

StudentInfoInstance.init({
    uuid: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    studentID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize: db,
    tableName: 'studentinfo'
})
