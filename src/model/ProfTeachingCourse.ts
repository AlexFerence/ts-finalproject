import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface ProfTeachingCourse {
    profEmail: string,
    courseID: string,
}

class ProfTeachingCourseInstance extends Model<ProfTeachingCourse> { }

ProfTeachingCourseInstance.init({
    profEmail: {
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
    }
}, {
    sequelize: db,
    tableName: 'profteachcourse'
})

