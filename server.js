const express = require('express');
const app = express();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const Routes = require('./configs/routes.js');

global.io = require('socket.io')(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/assets'));
app.use(require('method-override')());

// run node in multi core
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) { cluster.fork(); }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    server.listen(process.env.PORT || 9000, () => { console.log('Server runing with port 9000 !!!!'); });
    console.log(`Worker ${process.pid} started`);
}

Routes(app);
