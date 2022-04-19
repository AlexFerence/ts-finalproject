import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface TAofCourseModel {
    email: string,
    courseID: string,
    officeHoursTime: string,
    officeHoursLocation: string,
    duties: string
}

export class TAofCourseInstance extends Model<TAofCourseModel> { }

TAofCourseInstance.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        primaryKey: true,
    },
    courseID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        primaryKey: true,
    },
    officeHoursTime: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    officeHoursLocation: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    duties: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
}, {
    sequelize: db,
    tableName: 'taOfCourse'
});


