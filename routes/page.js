import express from 'express';
import homeController from '../controllers/HomeController';

const router = express.Router();

const initWebRouter = (app) => {
    app.get('/', homeController);

    app.get('/about', (req, res) => {
        res.render('about', {header: 'header', footer: 'footer'});
    });

    app.get('/contact', (req, res) => {
        res.render('contact', {header: 'header', footer: 'footer'});
    });

    return app.use('/', router);
};

export default initWebRouter;
