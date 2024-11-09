require('dotenv').config();
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import pool from '../connectDB.js';

const hashPassword = (password) => {
    const pass_hash = bcrypt.hashSync(password, salt);
    return pass_hash;
};

const checkEmail = async (username) => {
    // add check by sending email add later
    try {
        await pool.query('START TRANSACTION');
        const user = await pool.query(`SELECT username FROM nguoidung WHERE username = ?`, [
            username,
        ]);
        await pool.query('COMMIT');
        return user[0].length > 0;
    } catch (err) {
        await pool.query('ROLLBACK');

        console.log('CHECK_EMAIL | ERROR | ', err);
        return false;
    }
};

const checkPassword = async (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
};

const handleRegister = async (data) => {
    if (!data)
        return {
            EM: 'REGISTER | ERROR | Không có dữ liệu',
            EC: '401',
        };

    const { username, password, repass, fullname, email } = data;
    // first check
    if (!email)
        return {
            EM: 'REGISTER | ERROR | Email không thể để trống',
            EC: '400',
        };
    else if (!username)
        return {
            EM: 'REGISTER | ERROR | Tên đăng nhập không thể để trống',
            EC: '400',
        };
    else if (username.length > 100)
        return {
            EM: 'REGISTER | ERROR | Tên đăng nhập của bạn quá dài',
            EC: '400',
        };
    else if (password.length < 8 || password.length > 50)
        return {
            EM: 'REGISTER | ERROR | Mật khẩu có từ 8 - 50 kí tự',
            EC: '400',
        };
    else if (password !== repass)
        return {
            EM: 'REGISTER | ERROR | Mật khẩu nhập lại không trùng khớp',
            EC: '400',
        };
    else if (!fullname)
        return {
            EM: 'REGISTER | ERROR | Họ và tên không thể để trống',
            EC: '400',
        };
    else if (fullname.length > 100)
        return {
            EM: 'REGISTER | ERROR | Họ và tên của bạn quá dài',
            EC: '400',
        };

    const isEmailExist = await checkEmail(username);

    if (isEmailExist) {
        return {
            EM: 'REGISTER | ERROR | Tên đăng nhập đã tồn tại',
            EC: '400',
        };
    }

    try {
        await pool.query('START TRANSACTION');
        const hashPass = hashPassword(repass);

        // insert user information
        await pool.query(
            `INSERT INTO nguoidung (username, password, fullname, email)
                VALUES (?, ?, ?, ?)`,
            [username, hashPass, fullname, email],
        );

        await pool.query('COMMIT');

        return {
            EM: 'REGISTER | INFO | Đăng ký thành công',
            EC: '200',
        };
    } catch (error) {
        await pool.query('ROLLBACK');

        console.error('SERVICE | REGISTER | ERROR | ', error);
        return {
            EM: 'REGISTER | ERROR | ' + error,
            EC: '500',
        };
    }
};

const handleLogin = async (data) => {
    if (!data)
        return {
            EM: 'LOGIN | ERROR | Không có dữ liệu',
            EC: '401',
        };

    const { username, password: inputPassword } = data;

    if (!username)
        return {
            EM: 'LOGIN | ERROR | Tên đăng nhập không thể để trống',
            EC: '400',
        };
    else if (inputPassword.length < 8 || inputPassword.length > 50)
        return {
            EM: 'LOGIN | ERROR | Mật khẩu phải có 8 - 50 kí tự',
            EC: '400',
        };

    try {
        // check user status
        await pool.query('START TRANSACTION');
        // find current user
        const currUser = await pool.query(
            `SELECT id, role, password
            FROM nguoidung
            WHERE username = ?`,
            [data.username],
        );

        await pool.query('COMMIT');

        if (!currUser[0][0])
            return {
                EM: 'LOGIN | ERROR | Tài khoản không tồn tại',
                EC: '400',
                DT: '',
            };

        const { id, role, password } = currUser[0][0];

        // check password
        const isCorrectPassword = await checkPassword(inputPassword, password);

        if (!isCorrectPassword)
            return {
                EM: 'LOGIN | ERROR | Mật khẩu không chính xác',
                EC: '400',
                DT: '',
            };

        return {
            EM: 'LOGIN | INFO | Đăng nhập thành công',
            EC: '200',
            DT: {
                userId: id,
                username,
                role,
            },
        };
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('SERVICE | LOGIN | ERROR |', error);
        return {
            EM: 'LOGIN | ERROR | ' + error,
            EC: '500',
            DT: '',
        };
    }
};

export const authModels = {
    handleLogin,
    handleRegister,
};
