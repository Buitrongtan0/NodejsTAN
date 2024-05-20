import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
require('dotenv').config(); 
import cors from 'cors'


let app = express();
// app.use(cors({ origin: true }));
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;
// port === undefimed => port = 6969

app.listen(port, () => {
    //callback
    console.log(" backend node js"+port)
})