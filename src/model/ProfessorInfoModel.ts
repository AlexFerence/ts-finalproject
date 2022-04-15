import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface ProfessorInfoType {
    email: string,
    faculty: string,
    department: string
}

export class ProfessorInfoInstance extends Model<ProfessorInfoType> { }

ProfessorInfoInstance.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    faculty: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
}, {
    sequelize: db,
    tableName: 'professorinfo'
})

