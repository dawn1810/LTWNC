import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initApiRouter from './routes/api';
import initWebRouter from './routes/page';
import { checkAuthen } from './middleware/roleMiddleware';
import session from 'express-session';
import { redisStore } from './connectRedis';

const app = express();
const PORT = process.env.PORT;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//session
app.use(
    session({
        store: redisStore,
        resave: false,
        saveUninitialized: false,
        secret: 'keyboard cat',
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }),
);

// middleware
app.use(checkAuthen);

viewEngine(app);
initApiRouter(app);
initWebRouter(app);

app.listen(PORT, () => {
    console.log('Running on port ' + PORT + ':  http://localhost:' + PORT);
});
