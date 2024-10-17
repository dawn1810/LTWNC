import express from 'express';
import { getUserInfo } from '../controllers/HomeController';
const router = express.Router();


const initApiRouter = (app) => {
    router.post('/getUserInfo', getUserInfo);
    // router.post('/updateUserInfo', updateUserInfo);
    // router.post('/deleteUserInfo', deleteUserInfo);

    return app.use('/api', router);
};

export default initApiRouter;
