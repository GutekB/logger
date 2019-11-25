import User from '../models/user';
import jwt from 'jsonwebtoken';

export default {
    async login(req, res, next) {
        const token = jwt.sign({id: req.user._id}, process.env.JWT_SECRET, {expiresIn: 1200});

        res.send({
            token: {
                value: token,
                expiresIn: 1200
            }
        });
    },

    async register(req, res, next) {
        const {first_name, last_name, email, password} = req.body;
        const user = new User({first_name, last_name, email});
        await User.register(user, password).catch((err) => {
            res.send({
                'status': 'failed',
                'payload': {},
                'error': err.message
            })
        });

        res.json({
            'status': 'success',
            'payload': {},
            'errors': {},
        });
    }
}