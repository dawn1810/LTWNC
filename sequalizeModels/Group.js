import sequelize from '../sequalize';
import { DataTypes } from 'sequelize';
import Product from './Product';

const Group = sequelize.define(
    'nhom',
    {
        idnhom: {
            type: DataTypes.NUMBER,
            allowNull: false,
            unique: true,
        },
        ten: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    },
);

Group.hasMany(Product);

const syncDatabase = async () => {
    await Group.sync({ alter: true });
};

syncDatabase();
export default Group;
