import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface StudentTakingCourseType {
    studentEmail: string,
    courseID: string,
    term: string,
    year: string,
}

export class StudentTakingCourseInstance extends Model<StudentTakingCourseType> { }

StudentTakingCourseInstance.init({
    studentEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    courseID: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        unique: false,
        primaryKey: true
    },
    term: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
}, {
    sequelize: db,
    tableName: 'studenttakingcourse'
})



