import express from 'express';
import homeController from '../controllers/HomeController';
import aboutController from '../controllers/AboutController';
import contactController from '../controllers/ContactController';
import { loginController, registerController } from '../controllers/AuthenController';

const router = express.Router();

const initWebRouter = (app) => {
    app.get('/', homeController);

    app.get('/login', loginController);

    app.get('/register', registerController);

    app.get('/about', aboutController);

    app.get('/contact', contactController);

    return app.use('/', router);
};

export default initWebRouter;
