require('dotenv').config();
import jwt from 'jsonwebtoken';

const SecurePaths = ['/login', '/register', '/api/register', '/api/login'];

export const createToken = (payload) => {
    let key = process.env.JWT_SECRET_KEY;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log('error create token: ', error);
    }
    return token;
};

export const verifyToken = (token) => {
    let key = process.env.JWT_SECRET_KEY;
    let decode = null;

    try {
        decode = jwt.verify(token, key);
    } catch (error) {
        console.log('error verifying token: ', error);
    }
    return decode;
};

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

export const checkAuthen = async (req, res, next) => {
    if (SecurePaths.includes(req.path)) return next();
    const session = await req.session;

    const tokenFromHeader = extractToken(req);

    const token =
        session && session.user && session.user.access_token
            ? session.user.access_token
            : tokenFromHeader;

    if (!token)
        return res.status(200).json({
            EM: 'JWT | ERROR | Xác thực thất bại',
            EC: '401',
        });

    const decoded = verifyToken(token);

    if (!decoded)
        return res.status(200).json({
            EM: 'JWT | ERROR | Xác thực thất bại',
            EC: '401',
        });

    req.user = decoded;
    req.token = token;
    next();
    // res.redirect('/login');
};
