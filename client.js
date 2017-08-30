(() => {
    "use strict";
    
    const websocket = require('websocket').client;

    const ws = new websocket();

    ws.on('connectFailed', (err) => {
        console.log("Connect Error: "+err.toString());
    });

    ws.on('connect', (connection) => {
        console.log("WebSocket Client Connected at "+connection.remoteAddress);

        connection.sendUTF(JSON.stringify({message: "Hello"}));

        connection.on('error', (err) => {
            console.log("connection error: "+err.toString());
        });

        connection.on('close', () => {
            console.log('echo-protocol Connection Closed');
        });

        connection.on('message', (message) => {
            if(message.type === 'utf8') {
                console.log("received: "+message.utf8Data);
                if(JSON.parse(message.utf8Data).error == true) {
                    connection.close();
                    console.log("error!");
                }
            }
        });
    });

    ws.connect('ws://127.0.0.1:8080/', 'alert-protocol', 'alert-client');
})();