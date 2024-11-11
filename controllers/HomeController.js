import { models } from '../models/HomeModel';
require('dotenv').config();

const homeController = async (req, res) => {
    const data = await models.getUser();
    const session = await req.session;
    res.render('main', { header: 'header', footer: 'footer', data, user: session.user });
};

export const getUserInfo = async (req, res) => {
    const userId = await req.body.userId;
    const result = await models.getUserInfo(userId);

    return res.status(200).json(result);
};

export const updateUserInfo = async (req, res) => {
    const user = await req.session.user;
    const data = await req.body;

    if (user.role === 0 || user.userId === +data.userId) {
        const result = await models.updateUserInfo(data);

        return res.status(200).json(result);
    } else {
        return res.status(200).json({
            EM: 'UPDATE_USERINFO | ERROR | Ngoài thẩm quyền của bạn',
            EC: '403',
        });
    }
};

export const deleteUserInfo = async (req, res) => {
    const user = await req.session.user;
    const userId = await req.body.userId;

    if (user.role === 0 || user.userId === +userId) {
        const result = await models.deleteUserInfo(userId);

        return res.status(200).json(result);
    } else {
        return res.status(200).json({
            EM: 'DELETE_USERINFO | ERROR | Ngoài thẩm quyền của bạn',
            EC: '403',
        });
    }
};

export const deleteUserSequalize = async (req, res) => {
    const user = await req.session.user;
    const userId = await req.body.userId;

    if (user.role === 0 || user.userId === +userId) {
        const result = await models.deleteUserSequalize(userId);

        return res.status(200).json(result);
    } else {
        return res.status(200).json({
            EM: 'DELETE_SEQUALIZE | ERROR | Ngoài thẩm quyền của bạn',
            EC: '403',
        });
    }
};

export const addUser = async (req, res) => {
    const user = await req.session.user;
    const info = await req.body.info;

    if (user.role === 0) {
        const result = await models.addUser(info);

        return res.status(200).json(result);
    } else {
        return res.status(200).json({
            EM: 'ADD_USER | ERROR | Ngoài thẩm quyền của bạn',
            EC: '403',
        });
    }
};

export const addUserSequalize = async (req, res) => {
    const user = await req.session.user;
    const info = await req.body.info;

    if (user.role === 0) {
        const result = await models.addUserSequalize(info);

        return res.status(200).json(result);
    } else {
        return res.status(200).json({
            EM: 'ADD_USER | ERROR | Ngoài thẩm quyền của bạn',
            EC: '403',
        });
    }
};

export default homeController;
