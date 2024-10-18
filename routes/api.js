import express from 'express';
import { addUser, deleteUserInfo, getUserInfo, updateUserInfo } from '../controllers/HomeController';
const router = express.Router();

const initApiRouter = (app) => {
    router.post('/getUserInfo', getUserInfo);
    router.post('/updateUserInfo', updateUserInfo);
    router.post('/deleteUserInfo', deleteUserInfo);
    router.post('/addUser', addUser);

    return app.use('/api', router);
};

export default initApiRouter;
