import sequelize from '../sequalize';
import { DataTypes } from 'sequelize';
import Product from './Product';

const Group = sequelize.define(
    'nhom',
    {
        idnhom: {
            type: DataTypes.INTEGER,   
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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

// Group.hasMany(Product, {as: 'sanpham', foreignKey: 'idnhom'});

const syncDatabase = async () => {
    await Group.sync({ alter: true });
};

syncDatabase();
export default Group;
