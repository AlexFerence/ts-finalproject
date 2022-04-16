import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";

export interface SysopInfoType {
    uuid: string,
}

export class SysopInfoInstance extends Model<SysopInfoType> { }

SysopInfoInstance.init({
    uuid: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: db,
    tableName: 'sysopinfo'
})

