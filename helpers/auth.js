const jwt = require('jsonwebtoken');
const config = require('../configs/app.js');

module.exports = {
    createToken: (userId) => {
        return jwt.sign({ _id: userId }, config.secret, {
            expiresIn: 86400 * 30// expires in 30 day
        });
    },
    requiredToken: (req, res) => {
        var token = ((req.headers.authorization).split(/\s+/))[1];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token!' });
            } else {
                return true;
            }
        });
    }
}