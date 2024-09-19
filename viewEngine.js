const viewEngine=(app) => { 
    app.set("view engine", "ejs") 
    app.set("views","./") 
}

export default viewEngine;