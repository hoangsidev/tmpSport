const users = require('../routes/users.js');

module.exports = (app) => {
    app.get('/signUp', users.signUp);
    app.get('/signIn', users.signIn);
    app.get('/users', users.getUsers);
    app.get('/users/:userId', users.getUser);
}