import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

enum Term {
    Fall = "fall",
    Spring = "spring",
    Summer = "summer"
}

export interface CourseType {
    courseID: string,
    term: Term,
    year: string,
    courseNumber: string,
    courseCode: string,
    courseName: string,
}

export class CourseInstance extends Model<CourseType> { }

CourseInstance.init({
    courseID: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    term: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    courseCode: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    tableName: "courses"
});