import express from 'express';
import {
    addUser,
    addUserSequalize,
    deleteUserInfo,
    deleteUserSequalize,
    getUserInfo,
    updateUserInfo,
} from '../controllers/HomeController';
import { checkUser, handleLogin, handleLogout, handleRegister } from '../controllers/AuthenController';
import { getGroupList, getProductInfo, getProductList } from '../controllers/ProductController';
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
    router.get('/checkUser', checkUser);

    // group and product manage
    router.get('/getGroupList', getGroupList);
    router.post('/getProductList', getProductList);
    router.post('/getProductInfo', getProductInfo);


    return app.use('/api', router);
};

export default initApiRouter;
