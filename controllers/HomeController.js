import { models } from '../models/HomeModel';
require('dotenv').config();

const homeController = async (req, res) => {
    const data = await models.getUser();
    res.render('main', { header: 'header', footer: 'footer', data });
};

export const getUserInfo = async (req, res) => {
    const userId = await req.body.userId;
    console.log(userId);
    
    const result = await models.getUserInfo(userId);
    
    return res.status(200).json(result);
    
};

export default homeController;
