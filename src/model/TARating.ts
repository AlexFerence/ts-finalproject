import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface TaRatingModel {
    ratedByUuid: string,
    taRatedEmail: string,
    courseID: string,
    rating: number,
    comment: string,
}

export class TARatingInstance extends Model<TaRatingModel> { }

TARatingInstance.init({
    ratedByUuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        primaryKey: true,
    },
    taRatedEmail: {
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
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
}, {
    sequelize: db,
    tableName: 'taRating'
});



