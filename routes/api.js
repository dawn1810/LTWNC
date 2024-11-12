import express from 'express';
import {
    addUser,
    addUserSequalize,
    deleteUserInfo,
    deleteUserSequalize,
    getUserInfo,
    updateUserInfo,
} from '../controllers/HomeController';
import { handleLogin, handleLogout, handleRegister } from '../controllers/AuthenController';
const router = express.Router();

const initApiRouter = (app) => {
    router.post('/getUserInfo', getUserInfo);
    router.post('/updateUserInfo', updateUserInfo);
    router.post('/deleteUserInfo', deleteUserInfo);
    router.post('/deleteSequalize', deleteUserSequalize);
    router.post('/addUser', addUser);
    router.post('/addSequalize', addUserSequalize);

    // authen
    router.post('/register', handleRegister);
    router.post('/login', handleLogin);
    router.get('/logout', handleLogout);

    // group and product manage
    router.post('/getProductList', handleLogout);
    router.post('/getProductInfo', handleLogout);


    return app.use('/api', router);
};

export default initApiRouter;
