const requiredToken = require('../helpers/auth.js').requiredToken;
const response = require('../helpers/functions.js').response;
const users = require('../controllers/users.js');


const validator = (data, req, res) => {
    const responseValidate = (dataMap, typeReq) => {
        dataMap.map(param => {
            if (!(param in typeReq)) {
                response(res, 201, false, param + ' is required', {});
            }
        })
    }
    if (data.query) { responseValidate(data.query, req.query) }
    if (data.payload) { responseValidate(data.payload, req.payload) }
    if (data.params) { responseValidate(data.params, req.params) }
}

module.exports = {
    signUp: (req, res) => {
        validator({
            query: [
                'username',
                'email'
            ]
        }, req, res);
        users.signUp(req, res);
    },
    signIn: (req, res) => {
        users.signIn(req, res);
    },
    getUsers: (req, res) => {
        requiredToken(req, res);
        users.getUsers(req, res);
    },
    getUser: (req, res) => {
        requiredToken(req, res);
        users.getUser(req, res);
    }
}