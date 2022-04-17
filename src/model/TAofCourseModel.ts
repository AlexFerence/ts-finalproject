import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface TAofCourseModel {
    email: string,
    courseID: string
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
    }
}, {
    sequelize: db,
    tableName: 'taOfCourse'
});


