import express from 'express';
const router = express.Router();


const initApiRouter = (app) => {
    // auth
    // router.post('/detailAccount', detailAccount);
    // router.post('/updateUserInfo', updateUserInfo);
    // router.post('/deleteUserInfo', deleteUserInfo);

    return app.use('/api', router);
};

export default initApiRouter;
