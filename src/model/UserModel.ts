import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface UserType {
    uuid: string,
    studentID: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userType: string,
}

export class UserInstance extends Model<UserType> { }

UserInstance.init({
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
    },
    userType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: 'users'
})



