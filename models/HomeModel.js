require('dotenv').config();
import pool from '../connectDB';
import bcrypt from 'bcryptjs';
import User from '../sequalizeModels/User';
import sequelize from '../sequalize';
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    const pass_hash = bcrypt.hashSync(password, salt);
    return pass_hash;
};

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
        console.error('MODEL | GETUSER | ERROR |', error);
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
        console.error('MODEL | GETUSERINFO | ERROR |', error);
        return {
            EM: 'GETUSERINFO | ERROR | ' + error,
            EC: '500',
        };
    }
};

const updateUserInfo = async (data) => {
    try {
        const {
            userId,
            newData: { fullname, address, gender, email },
        } = data;

        // get email@
        await pool.query('START TRANSACTION');
        // find current user
        const currUser = await pool.query(
            `UPDATE nguoidung
            SET fullname = ?, address = ?, sex = ?, email = ?
            WHERE id = ?`,
            [fullname, address, +gender, email, userId],
        );

        await pool.query('COMMIT');

        if (currUser[0].affectedRows === 1) {
            return {
                EM: 'UPDATE_USERINFO | INFO | Update user success',
                EC: '200',
            };
        } else {
            return {
                EM: 'UPDATE_USERINFO | ERROR | No change have done',
                EC: '400',
            };
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('MODEL | UPDATE_USERINFO | ERROR |', error);
        return {
            EM: 'UPDATE_USERINFO | ERROR | ' + error,
            EC: '500',
        };
    }
};

const deleteUserInfo = async (userId) => {
    try {
        await pool.query('START TRANSACTION');
        // find current user
        const currUser = await pool.query(
            `DELETE FROM nguoidung
            WHERE id = ?
            `,
            [userId],
        );

        await pool.query('COMMIT');

        if (currUser[0].affectedRows == 1) {
            return {
                EM: 'DELETE_USERINFO | INFO | delete user success',
                EC: '200',
            };
        } else {
            return {
                EM: 'DELETE_USERINFO | ERROR | No change have done',
                EC: '400',
            };
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('MODEL | DELETE_USERINFO | ERROR |', error);
        return {
            EM: 'DELETE_USERINFO | ERROR | ' + error,
            EC: '500',
        };
    }
};

const addUser = async (info) => {
    try {
        const { username, password, fullname, address, gender, email } = info;

        if (!username) {
            return {
                EM: 'ADD_USERINFO | ERROR | Username is empty',
                EC: '400',
            };
        } else if (!password) {
            return {
                EM: 'ADD_USERINFO | ERROR | Password is empty',
                EC: '400',
            };
        }

        await pool.query('START TRANSACTION');
        const checkUser = await pool.query(
            `SELECT id
            FROM nguoidung
            WHERE username = ?`,
            [username],
        );

        if (!checkUser[0][0]) {
            const hashPass = hashPassword(password);
            // find current user
            const currUser = await pool.query(
                `INSERT INTO nguoidung (username, password, fullname, address, sex, email)
                VALUES (?, ?, ?, ?, ?, ?)
                `,
                [username, hashPass, fullname, address, gender, email],
            );

            await pool.query('COMMIT');

            if (currUser[0].affectedRows === 1) {
                return {
                    EM: 'ADD_USERINFO | INFO | add user success',
                    EC: '200',
                    DT: currUser[0].insertId,
                };
            } else {
                return {
                    EM: 'ADD_USERINFO | ERROR | No change have done',
                    EC: '400',
                };
            }
        } else {
            return {
                EM: 'ADD_USERINFO | ERROR | User already exist',
                EC: '403',
            };
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('MODEL | ADD_USERINFO | ERROR |', error);
        return {
            EM: 'ADD_USERINFO | ERROR | ' + error,
            EC: '500',
        };
    }
};

const deleteUserSequalize = async (userId) => {
    const deleteTransaction = await sequelize.transaction();
    try {
        const deleteUser = User.destroy(
            {
                where: {
                    id: userId,
                },
            },
            { transaction: deleteTransaction },
        );
        await deleteTransaction.commit();

        if (deleteUser) {
            return {
                EM: 'DELETE_USERINFO | INFO | delete user success',
                EC: '200',
            };
        } else {
            return {
                EM: 'DELETE_USERINFO | ERROR | No change have done',
                EC: '400',
            };
        }
    } catch (error) {
        await deleteTransaction.rollback();
        console.error('MODEL | DELETE_USERINFO | ERROR |', error);
        return {
            EM: 'DELETE_USERINFO | ERROR | ' + error,
            EC: '500',
        };
    }
};

const addUserSequalize = async (info) => {
    const addTransaction = await sequelize.transaction();
    try {
        const { username, password, fullname, address, gender, email } = info;

        if (!username) {
            return {
                EM: 'ADD_USERINFO | ERROR | Username is empty',
                EC: '400',
            };
        } else if (!password) {
            return {
                EM: 'ADD_USERINFO | ERROR | Password is empty',
                EC: '400',
            };
        }

        const checkUser = await User.findOne(
            { attributes: ['id'], where: { username: username } },
            { transaction: addTransaction },
        );

        // check if user exist
        if (checkUser)
            return {
                EM: 'ADD_USERINFO | ERROR | User already exist',
                EC: '403',
            };

        const hashPass = hashPassword(password);

        const currUser = await User.create(
            {
                username: username,
                password: hashPass,
                fullname: fullname,
                address: address,
                sex: gender,
                email: email,
            },
            { transaction: addTransaction },
        );

        await addTransaction.commit();

        if (!currUser) {
            return {
                EM: 'ADD_USERINFO | ERROR | No change have done',
                EC: '400',
            };
        }

        return {
            EM: 'ADD_USERINFO | INFO | add user success',
            EC: '200',
            DT: currUser.dataValues.id,
        };
    } catch (error) {
        await addTransaction.rollback();
        console.error('MODEL | ADD_USERINFO | ERROR |', error);
        return {
            EM: 'ADD_USERINFO | ERROR | ' + error,
            EC: '500',
        };
    }
};

export const models = {
    getUser,
    getUserInfo,
    updateUserInfo,
    deleteUserInfo,
    deleteUserSequalize,
    addUser,
    addUserSequalize,
};
