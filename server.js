import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import viewEngine from './config/viewEngine';
import initApiRouter from './routes/api';
import initWebRouter from './routes/page';
import { checkAuthen } from './middleware/roleMiddleware';
import session from 'express-session';
import { redisStore } from './connectRedis';

const app = express();
const PORT = process.env.PORT;

//session
app.use(
    session({
        store: redisStore,
        resave: false,
        saveUninitialized: false,
        secret: 'keyboard cat',
    }),
);

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// middleware
app.use(checkAuthen);

viewEngine(app);
initApiRouter(app);
initWebRouter(app);

app.listen(PORT, () => {
    console.log('Running on port ' + PORT + ':  http://localhost:' + PORT);
});
