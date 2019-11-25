import Token from '../models/token';

export function checkPermToken(fn) {
    return async (req, res, next) => {
        let token = req.headers.authorization;
        if (typeof token !== 'undefined') {
            token = token.replace('Bearer perm:', '');

            if (await Token.checkToken(token)) {
                req.body.systemName = await Token.getSystemNameFor(token);
                return fn(req, res, next);
            }

            throw new Error("Error! Token is not valid.");
        }

        throw new Error("Error! Headers Authorization is empty.");
    };
}