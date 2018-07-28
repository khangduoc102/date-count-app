#!/usr/bin/env nodejs
const io = require('socket.io')();

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

const port = 3000;
io.listen(port);
console.log('listening on port ', port);

/*
var app = require('express')();
var http = require('http').Server(app);
var cors = require('cors');
var io = require('socket.io')(http);

const desDate = new Date("2018-08-04T15:00:00").getTime();
const orgDate = new Date("2018-07-06T02:00:00").getTime();

const totalTime = desDate - orgDate;

app.use(cors());

io.on('connection', function(client){
    console.log('a user connected');
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', {percent: (new Date().getTime() - orgDate) / totalTime * 100, left: desDate - new Date().getTime()});
        }, interval);
    });
});

http.listen(8080, function(){
  console.log('listening on *:8000');
});
*/
