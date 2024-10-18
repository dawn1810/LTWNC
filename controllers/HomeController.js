import { models } from '../models/HomeModel';
require('dotenv').config();

const homeController = async (req, res) => {
    const data = await models.getUser();
    res.render('main', { header: 'header', footer: 'footer', data });
};

export const getUserInfo = async (req, res) => {
    const userId = await req.body.userId;

    const result = await models.getUserInfo(userId);

    return res.status(200).json(result);
};

export const updateUserInfo = async (req, res) => {
    const data = await req.body;

    const result = await models.updateUserInfo(data);

    return res.status(200).json(result);
};

export const deleteUserInfo = async (req, res) => {
    const userId = await req.body.userId;

    const result = await models.deleteUserInfo(userId);

    return res.status(200).json(result);
};

export const addUser = async (req, res) => {
    const info = await req.body.info;

    const result = await models.addUser(info);

    return res.status(200).json(result);
};

export default homeController;
