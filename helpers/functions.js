const bcrypt = require('bcryptjs');
module.exports = {
    toJson: (data) => {
        return JSON.parse(JSON.stringify(data));;
    },
    createHash: (string, length) => {
        return bcrypt.hashSync(string, length);
    },
    response: (res, statusCode, success, message, data) => {
        return res.json({
            statusCode: statusCode,
            success: success,
            message: message,
            data: data
        });
    }
}