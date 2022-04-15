import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface UserType {
    uuid: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export class UserInstance extends Model<UserType> { }

UserInstance.init({
    uuid: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize: db,
    tableName: 'users'
})



