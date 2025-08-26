import express, {Express} from "express";
// lay app tu server.js 
const configViewEngine = (app: Express) => {
    //thiet lap thu muc chua file tinh
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

export default configViewEngine;