import express from 'express';
import dotenv from 'dotenv/config';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initApiRouter from './routes/api';
import initWebRouter from './routes/page';

const app = express();
const PORT = process.env.PORT;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

viewEngine(app);
initApiRouter(app);
initWebRouter(app);

app.listen(PORT, () => {
    console.log('Running on port ' + PORT + ':  http://localhost:' + PORT);
});
