import Token from '../models/token'
import randToken from 'rand-token';

export default {

    //create
    async create(req, res, next) {
        await Token.init();

        const token = await new Token({
            name: req.body.name,
            value: randToken.generate(64),
        }).save();

        return res.status(201).send({
            'status': 'success',
            'payload': {
                'message': 'Token created success',
                'token': token,
            },
            'error': {}
        })
    },
    //findAll
    async findAll(req, res, next) {
        //TODO
    },
}