#!/usr/bin/env nodejs
var io = require('socket.io')();
var cors = require('cors');

const desDate = new Date("2018-08-04T15:00:00").getTime();
const orgDate = new Date("2018-07-06T02:00:00").getTime();

const totalTime = desDate - orgDate;

console.log(orgDate);

io.on('connection', (client) => {
    // here you can start emitting events to the client 
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', {percent: (new Date().getTime() - orgDate) / totalTime * 100, left: desDate - new Date().getTime()});
        }, interval);
    });
});

const port = 8000;
io.use(cors);
io.listen(port);
console.log('listening on port ', port);
