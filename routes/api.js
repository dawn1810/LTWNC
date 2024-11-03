import express from 'express';
import {
    addUser,
    deleteUserInfo,
    getUserInfo,
    updateUserInfo,
} from '../controllers/HomeController';
import { handleLogin, handleLogout, handleRegister } from '../controllers/AuthenController';
const router = express.Router();

const initApiRouter = (app) => {
    router.post('/getUserInfo', getUserInfo);
    router.post('/updateUserInfo', updateUserInfo);
    router.post('/deleteUserInfo', deleteUserInfo);
    router.post('/addUser', addUser);
    router.post('/register', handleRegister);
    router.post('/login', handleLogin);

    router.get('/logout', handleLogout);

    return app.use('/api', router);
};

export default initApiRouter;
