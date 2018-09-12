const users = require('../models/users.js');
module.exports = {
    findAll: (data) => {
        var condition = data.condition ? data.condition : null,
            sort = data.sort ? data.sort : null,
            select = data.select ? data.select : null,
            project = {},
            paginate = data.paginate ? data.paginate : null,
            limit = data.limit ? data.limit : null;
        select.map(obj => { project[obj] = 1 });

        return users.aggregate([
            { $match: condition },
            { $sort: sort },
            { $project: { ...project } },
            { $skip: (limit * paginate) - limit },
            { $limit: limit },
        ]);
    },

    findOne: (data) => {
        var condition = data.condition ? data.condition : null,
            select = data.select ? data.select : null,
            project = {};
        select.map(obj => { project[obj] = 1 });

        return users.aggregate([
            { $match: condition },
            { $project: { ...project } }
        ]);
    },
}