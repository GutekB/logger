import Exception from '../models/exception'

export default {

    //create
    async create(req, res, next) {
        await Exception.init();

        const exception = await new Exception({
            message: req.body.exception.message,
            code: req.body.exception.code,
            file: req.body.exception.file,
            line: req.body.exception.line,
            systemName: req.body.systemName,
            trace: req.body.exception.trace,
        }).save();

        return res.status(201).send({
            'status': 'success',
            'payload': {
                'message': 'Exception created success',
                'token': exception,
            },
            'error': {}
        })
    },
    //findAll
    async findAll(req, res, next) {
        const sort_by = {};
        sort_by[req.query.sort_by || 'createdAt'] = req.query.order_by || 'asc';

        const exceptionsPromise = Exception.paginate(req.filters, {
            sort: sort_by,
            limit: parseInt(req.query.limit) || 25,
            page: parseInt(req.query.page) || 1,
        });

        const [exceptions] = await Promise.all([exceptionsPromise]);

        return res.status(200).send({
            'status': 'success',
            'payload': exceptions,
            'errors': {}
        })
    },
}