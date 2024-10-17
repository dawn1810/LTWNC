import express from 'express';

const configViewEngine = (app) => {
    app.use(
        express.static('../public', {
            setHeaders: function (res, path, stat) {
                if (path.endsWith('.css')) {
                    res.set('Content-Type', 'text/css');
                } else {
                    res.set('Content-Type', 'text/html');
                }
            },
        }),
    );
    app.set('view engine', 'ejs');
    app.set('views', './views/');
};

export default configViewEngine;
