import express from 'express';

const configViewEngine = (app) => {
    app.set("view engine", "ejs") 
    app.set("views","./views/") 
};

export default configViewEngine;
