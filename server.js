#!/usr/bin/env nodejs
var io = require('socket.io')();
var cors = require('cors');

const path = require('path');
const http = require('http');
const express= require('express');
var cors = require('cors');

var app = express();
var server = http.createServer(app);

const publicPath = path.join(__dirname, './build');


app.get('/', (req,res) => {
    res.sendFile(publicPath + '/index.html');
})


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
