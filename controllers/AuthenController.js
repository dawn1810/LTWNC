import { authModels } from '../models/AuthModel';
require('dotenv').config();

export const loginController = async (req, res) => {
    res.render('login');
};

export const registerController = async (req, res) => {
    res.render('register');
};

export const handleRegister = async (req, res) => {
    const data = await req.body;

    const result = await authModels.handleRegister(data);

    return res.status(200).json(result);
};

export const handleLogin = async (req, res) => {
    try {
        const data = await req.body;

        const result = await authModels.handleLogin(data);

        if (result.DT) {
            req.session.cookie.maxAge = 30 * 24 * 3600000;
            res.cookie('jwt', result.DT.access_token, {
                maxAge: 30 * 24 * 3600000,
                httpOnly: true,
                secure: false,
                path: '/',
                domain: 'localhost',
            });
            req.session.user = result.DT;
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('CONTROLLER | LOGIN | ERROR |', error);
        return {
            EM: 'LOGIN | ERROR | ' + error,
            EC: '500',
            DT: '',
        };
    }
};

export const handleLogout = async (req, res) => {
    try {
        // Destroy the session
        res.clearCookie('jwt');
        req.session.destroy((err) => {
            if (err) {
                console.error('LOGOUT | INFO | Lỗi xoá session ' + err);
                return res.status(200).json({
                    EM: 'LOGOUT | ERROR | Lỗi xoá session ' + err,
                    EC: '500',
                });
            }
        });
        return res.status(200).json({
            EM: 'LOGOUT | INFO | Đăng xuất thành công',
            EC: '200',
        });
    } catch (error) {
        console.error('CONTROLLER | LOGOUT | ERROR | ' + error);

        return res.status(200).json({
            EM: 'LOGOUT | ERROR | ' + error,
            EC: '500',
        });
    }
};

export const checkUser = async (req, res) => {
    try {
        const userId = await req.session.user.userId;

        const result = await authModels.checkUser(+userId);

        return res.status(200).json(result);
    } catch (error) {
        console.error('CONTROLLER | CHECK_USER | ERROR |', error);
        return {
            EM: 'CHECK_USER | ERROR | ' + error,
            EC: '500',
        };
    }
};
