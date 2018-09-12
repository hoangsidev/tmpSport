const mongoose = require('../configs/database.js'),
    schema = mongoose.Schema,
    objectId = schema.ObjectId,
    usersSchema = new mongoose.Schema({
        username: { type: String, default: null },
        email: { type: String, default: null },
    }, { versionKey: false });
module.exports = mongoose.model('users', usersSchema); 