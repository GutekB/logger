import {Router} from 'express';
import {catchAsync} from "../middlewares/errors";
import {checkPermToken} from "../middlewares/authorization";
import getFilters from "../middlewares/filters/logsfilter";
import jwtAuth from "../middlewares/authentication";
import exceptionController from "../controllers/exceptionController";

export default () => {
    const api = Router();

    //create
    api.post('/', catchAsync(checkPermToken(exceptionController.create)));

    //findOne
    api.get('/:id', jwtAuth, catchAsync(exceptionController.findOne));

    //findAll
    api.get('/', jwtAuth, getFilters, catchAsync(exceptionController.findAll));

    return api;
}