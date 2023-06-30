import express from "express";
import core from 'express-serve-static-core';
import morgan from 'morgan';
import { Controller } from "../../injector/controller";
import { logger } from '../../shared/logger';

export const Router = (): core.Express => {
    const app = express();

    app.use(morgan('dev'));
    app.use(express.json());

    const controller = Controller.newController();

    app.route('/users')
        .post(async (req, res) => {
            try {
                controller.User.createUser(req, res);
            } catch (error) {
                logger.error(error);
                res.status(500).send('An unexpected error occurred');
            }
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
