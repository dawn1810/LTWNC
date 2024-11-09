import sequelize from '../sequalize';
import { DataTypes } from 'sequelize';

// Define a model
const User = sequelize.define(
    'nguoidung',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        sex: {
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.INTEGER,
        },
    },
    {
        freezeTableName: true,
    },
);
// Synchronize the model with the database
// This function will delete all existing tables in the database
const syncDatabase = async () => {
    await sequelize.sync();
    console.log('Cập nhật cơ sở dữ liệu.');
};
// remember to comment this after server runs ones.
syncDatabase();
export default User;
