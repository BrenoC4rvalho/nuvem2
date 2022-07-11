import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/pg";

export interface UserInstance extends Model {
    id: number;
    nickname: number;
    password: string;
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    nickname: {
        type: DataTypes.STRING, 
        unique: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});