require('dotenv').config();
import pool from '../connectDB';

const getUser = async () => {
    try {
        // get email@
        await pool.query('START TRANSACTION');
        // find current user
        const listUser = await pool.query(
            `SELECT id, username, fullname, address
            FROM nguoidung`,
        );

        await pool.query('COMMIT');

        return listUser[0];
    } catch (error) {
        await pool.query('ROLLBACK');
        console.log('MODEL | GETUSER | ERROR |', error);
        return {
            EM: 'GETUSER | ERROR | ' + error,
            EC: '500',
        };
    }
};

const getUserInfo = async (userId) => {
    try {
        // get email@
        await pool.query('START TRANSACTION');
        // find current user
        const currUser = await pool.query(
            `SELECT id, username, fullname, address, sex, email
            FROM nguoidung
            WHERE id = ?`,
            [userId],
        );

        await pool.query('COMMIT');
        
        return {
            EM: 'GETUSERINFO | INFO | get user success',
            EC: '200',
            DT: currUser[0][0],
        };
    } catch (error) {
        await pool.query('ROLLBACK');
        console.log('MODEL | GETUSERINFO | ERROR |', error);
        return {
            EM: 'GETUSERINFO | ERROR | ' + error,
            EC: '500',
        };
    }
};

export const models = {
    getUser,
    getUserInfo,
};
