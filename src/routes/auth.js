import { Router } from 'express';
import { catchAsync } from "../middlewares/errors";
import AuthenticationController from '../controllers/authenticationController';
import passport from 'passport';

export default () => {
    const api = Router();

    api.post('/login', passport.authenticate('local', { session: false }), catchAsync(AuthenticationController.login));

    api.post('/register', catchAsync(AuthenticationController.register));

    return api;
}