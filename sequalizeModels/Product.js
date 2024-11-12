import sequelize from '../sequalize';
import { DataTypes } from 'sequelize';
import Group from './Group';

const Product = sequelize.define(
    'sanpham',
    {
        masp: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        ten: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hinhanh: {
            type: DataTypes.STRING,
        },
        mota: {
            type: DataTypes.STRING,
        },
        idnhom: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    },
);

// Product.belongsTo(Group, {foreignKey: 'idnhom'});

const syncDatabase = async () => {
    await Product.sync({ alter: true });
};

syncDatabase();
export default Product;
