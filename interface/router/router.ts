import express from "express";
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.route('/users')
    .post((req, res) => {

    });

app.route('/login')
    .post((req, res) => {

    });

app.route('/tasks')
    .post((req, res) => {

    })
    .get((req, res) => {

    })
    .put((req, res) => {

    });
