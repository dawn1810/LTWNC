const SecurePaths = ['/login', 'register'];

export const checkAuthen = (req, res, next) => {
    if (SecurePaths.includes(req.path)) return next();
    let session = req.session;
    if (session && session.userId) {

        if (!decoded) {s
            return res.status(401).json({
                EM: 'MIDDLEWARE | ERROR | Xác thực thất bại',
                EC: '401',
            });
        }

        req.user = decoded;
        req.token = token;
        next();
    } else {
        res.redirect('/login')
    }
};
