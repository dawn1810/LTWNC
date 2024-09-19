import express from 'express';
import dotenv from 'dotenv/config';
import date from './date';
import getURL from './getURL';
import viewEngine from './viewEngine';

const app = express();
const port = process.env.PORT;

viewEngine(app);

app.get('/', (req, res) => {
    // res.send('Hello world');
    res.render("home") 
})

app.get('/about', (req, res) => {
    // res.send('Hello world!. page ABOUT');
    res.render("about") 
})

app.get('/date', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'}); 
    res.write(date() + "<br>");
    res.end('');
})

app.get('/geturl', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.write (getURL.getPath(req)+"<br>"); 
    res.write(getURL.getParamsURL(req)+"<br>");
    res.end('');
})

app.get('/ejs', (req, res) => { 
    res.render("test") 
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})