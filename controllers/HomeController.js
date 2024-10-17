import { models } from '../models/HomeModel';
require('dotenv').config();

const homeController = async (req, res) => {
    const data = await models.getUser();
    res.render('main', { header: 'header', footer: 'footer', data: data });
};

export default homeController;
