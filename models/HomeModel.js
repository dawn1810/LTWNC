require('dotenv').config();
import pool from '../connectDB';

const getUser = async () => {
    try {
        // get email@
        await pool.query('START TRANSACTION');
        // find current user
        const currUser = await pool.query(
            `SELECT id, username, fullname, address
            FROM nguoidung`,
        );

        await pool.query('COMMIT');

        console.log(currUser[0]);

        return currUser[0];
    } catch (error) {
        await pool.query('ROLLBACK');
        console.log('MODEL | GETUSER | ERROR |', error);
        return {
            EM: 'GETUSER | ERROR | ' + error,
            EC: '500',
        };
    }
};

export const models = {
    getUser,
};
