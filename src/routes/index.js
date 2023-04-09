import {Router} from 'express';
const router = Router();

import Image from '../models/image.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import fs from 'fs-extra';

export default router
    .get('/', async(req,res) => {
        const images = await Image.find();
        res.render('index.ejs',{images});
    })
    .get('/upload',(req,res) => {
        res.render("upload.ejs")
    })
    .post('/upload', async (req,res) => {
        const image = new Image();
        image.title = req.body.title;
        image.description = req.body.description;
        image.filename = req.file.filename;
        image.path = '/images/uploads/' + req.file.filename;
        image.mimetype = req.file.mimetype;
        image.size = req.file.size;
        await image.save();
        res.redirect('/');
    })
    .get('/image/:id', async(req,res) => {
        const {id} = req.params;
        const image = await Image.findById(id);
        res.render("profile.ejs",{image});
    })
    .get('/image/:id/delete', async (req,res) => {
        const {id} = req.params;
        const image = await Image.findByIdAndDelete(id);  
        await fs.unlink(__dirname.replace("routes","public")+image.path);
        res.redirect('/');
    })