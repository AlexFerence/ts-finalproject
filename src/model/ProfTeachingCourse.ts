import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface ProfTeachingCourse {
    email: string,
    courseID: string,
}

export class ProfTeachingCourseInstance extends Model<ProfTeachingCourse> { }

ProfTeachingCourseInstance.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    courseID: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    }
}, {
    sequelize: db,
    tableName: 'profteachcourse'
})

