import {Router} from 'express';
import {catchAsync} from "../middlewares/errors";
import {checkPermToken} from "../middlewares/authorization";
import logController from '../controllers/logController';
import getFilters from "../middlewares/filters/logsfilter";
import jwtAuth from "../middlewares/authentication";

export default () => {
    const api = Router();

    //create
    api.post('/', catchAsync(checkPermToken(logController.create)));
    // api.post('/', logController.create);

    //findOne
    api.get('/:id', jwtAuth, catchAsync(logController.findOne));

    //findAll
    api.get('/', jwtAuth, getFilters, catchAsync(logController.findAll));

    return api;
}