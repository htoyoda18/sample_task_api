import express from "express";
import core from 'express-serve-static-core';
import morgan from 'morgan';
import { Controller } from "../../injector/controller";

export const Router = (): core.Express => {
    const app = express();

    app.use(morgan('dev'));

    const controller = Controller.NewController();

    app.route('/users')
        .post((req, res) => {
            controller.User.CreateUser(req, res);
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

    return app;
}
