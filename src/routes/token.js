import {Router} from 'express';
import {catchAsync} from "../middlewares/errors";
import jwtAuth from "../middlewares/authentication";
import tokenController from "../controllers/tokenController";

export default () => {
    const api = Router();

    //create
    api.post('/', jwtAuth, catchAsync(tokenController.create));

    //findAll
    api.get('/', jwtAuth, catchAsync(tokenController.findAll));

    return api;
}