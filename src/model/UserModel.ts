import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

interface UserAttributes {
    uuid: string,
    studentID: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userType: string
}

export class UserInstance extends Model<UserAttributes> { }

UserInstance.init({
    uuid: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    studentID: {
        type: DataTypes.STRING,
        allowNull: false
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
        allowNull: false
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
