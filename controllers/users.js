const users = require('../resourceAccess/users.js');
const createToken = require('../helpers/auth.js').createToken;
const createHash = require('../helpers/functions.js').createHash;
const response = require('../helpers/functions.js').response;
const toJson = require('../helpers/functions.js').toJson;
const objectId = require('mongodb').ObjectID;

module.exports = {
    signUp: (req, res) => {
        response(res, 201, true, null, {
            token: createToken('123456789'),
            users: {}
        });
    },
    signIn: (req, res) => {
        response(res, 201, true, null, {
            user: {}
        });
    },
    getUsers: (req, res) => {
        var data = {
            condition: {},
            sort: { 'createdAt': 1 },
            select: ['username'],
            paginate: req.params.paginate || 1,
            limit: req.params.paginate || 20
        };
        users.findAll(data).then(results => {
            results = toJson(results);
            response(res, 201, true, null, {
                users: results
            });
        });
    },
    getUser: (req, res) => {
        var data = {
            condition: {
                _id: objectId(req.params.userId)
            },
            select: ['username']
        };
        users.findOne(data).then(result => {
            result = toJson(result[0]);
            response(res, 201, true, null, {
                user: result
            });
        });
    }
}