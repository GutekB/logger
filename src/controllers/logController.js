import Log from '../models/log'

export default {

    //create
    async create(req, res, next) {

        await Log.init();

        const log = new Log({
            type: req.body.type,
            action: req.body.action,
            message: req.body.message,
            systemName: req.body.systemName,
            userId: req.body.userId,
            userAgent: req.body.userAgent,
            ip: req.body.ip,
            params: req.body.params,
            before: req.body.before,
            after: req.body.after,
        }).save();

        res.send({
            status: 'success',
            payload: 'Zajbiscie',
            errors: '',
        })
    },

    //findOne
    async findOne(req, res, next) {
        const log = await Log.findOne({action: req.params.action});

        if (!log) return next();

        return res.status(200).send({
            'status': 'success',
            'payload': log,
            'errors': {}
        });
    },

    //findAll
    async findAll(req, res, next) {

        const sort_by = {};
        sort_by[req.query.sort_by || 'createdAt'] = req.query.order_by || 'asc';

        const logsPromise = Log.paginate(req.filters, {
            sort: sort_by,
            limit: parseInt(req.query.limit) || 25,
            page: parseInt(req.query.page) || 1,
        });

        const [logs] = await Promise.all([logsPromise]);

        return res.status(200).send({
            'status': 'success',
            'payload': logs,
            'errors': {}
        })
    },
}