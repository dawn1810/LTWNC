import express from 'express';
import homeController from '../controllers/HomeController';
import aboutController from '../controllers/AboutController';
import contactController from '../controllers/ContactController';

const router = express.Router();

const initWebRouter = (app) => {
    app.get('/', homeController);

    app.get('/about', aboutController);

    app.get('/contact', contactController);

    return app.use('/', router);
};

export default initWebRouter;
