import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface TAInfoModel {
    email: string,
    faculty: string,
    department: string,
    firstName: string,
    lastName: string
}

export class TAInfoInstance extends Model<TAInfoModel> { }

TAInfoInstance.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    faculty: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
}, {
    sequelize: db,
    tableName: 'taInfo'
});