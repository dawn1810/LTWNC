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
    const data = await req.body;

    const result = await authModels.handleLogin(data);

    if (result.DT) {
        req.session.user = result.DT;
    }

    return res.status(200).json(result);
};

export const handleLogout = async (req, res) => {
    try {
        // Destroy the session
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
        console.log('CONTROLLER | LOGOUT | ERROR | ' + error);

        return res.status(200).json({
            EM: 'LOGOUT | ERROR | ' + error,
            EC: '500',
        });
    }
};
