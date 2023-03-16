const {io} = require('../app');

// client connection
io.on('connection', (client) => {
    // console.log('Client connected');

    // Disconnection client
    client.on('disconnect', (client) => {
        // console.log('Client Disconnected: ');
    });

    // Message (listen)
    client.on('testMessage', (payload) => {
        // console.log('Message received: ', payload);
    });


    // send mensaje
    // client.emit('sendMessage', data)
    
    // send message all user
    // client.broadcast.emit('testSocket', 'text');


    //Send notification
    client.broadcast.emit('notification', 'payload');
});