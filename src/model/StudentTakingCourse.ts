import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface StudentTakingCourseType {
    studentEmail: string,
    courseID: string,
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
}, {
    sequelize: db,
    tableName: 'studenttakingcourse'
})



