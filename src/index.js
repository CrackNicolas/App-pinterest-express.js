import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import {format} from 'timeago.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import './database.js'
import router from './routes/index.js';

// Initializations
const app = express();

//Settings
app.set("port",process.env.PORT || 3000);
app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");

//Middlewars
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
    destination : path.join(__dirname,'public/images/uploads'),
    filename : (req,file,cb,filename) => {
        cb(null, file.originalname)
    }
})
app.use(multer({storage : storage}).single('image'));

//Global variables
app.use((req,res,next) => {
    app.locals.format = format;
    next();
})

//Routes
app.use(router);

//Static files
app.use(express.static(path.join(__dirname,'public')));

//Start server
app.listen(3000, () => {
    console.log("Server an port ",app.get('port'));
})