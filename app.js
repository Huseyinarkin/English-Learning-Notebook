// require('dotenv').config();
// const express = require('express');
// const res = require('express/lib/response');

import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import bodyParser from 'body-parser';
import Word from './models/wordModel.js';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL;
const app = express()
const port = process.env.PORT || 3000;

app.get('/editWord', async (req, res) => {

    mongoose.connect(mongoUrl);
    const data = await Word.find({});

    res.render('editWord.ejs', { data: data });
})

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/editWord', async (req, res) => {

    mongoose.connect(mongoUrl);
    const newData = new Word({
        word: req.body.exampleInputWord,
        trWord: req.body.exampleInputTrWord.split("\n"),
        rating: 1
        // Add more fields as necessary
    });
    await newData.save();

    res.redirect('/editWord');
});

app.delete('/editWord', async (req, res) => {

    var id = req.query.id;

    mongoose.connect(mongoUrl);
    await Word.deleteOne({ _id: id });
    res.sendStatus(200);
})

app.get('/', async (req, res) => {

    mongoose.connect(mongoUrl);
    const data = await Word.find({});

    res.render('home.ejs', { data: data });
})

app.get('*', (req, res) => {
    res.send('Sayfa Bulunamadı')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})






