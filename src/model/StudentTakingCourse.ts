import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface StudentTakingCourseType {
    uuid: string,
    courseID: string,
}

export class StudentTakingCourseInstance extends Model<StudentTakingCourseType> { }

StudentTakingCourseInstance.init({
    uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
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



