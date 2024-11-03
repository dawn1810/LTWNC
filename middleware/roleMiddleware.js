const SecurePaths = ['/login', '/register', '/api/register', '/api/login'];

export const checkAuthen = async (req, res, next) => {
    if (SecurePaths.includes(req.path)) return next();
    let session = await req.session;
    if (session && session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};
