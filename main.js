(() => {
    //init
    "use strict";

    const websocket = require('websocket').server;
    const express = require('express');
    const app = express();

    app.all('/', (req, res) => {
        res.jsonp({message: "websocket server is well"}).end();
    });

    const server = app.listen(8080, () => {
        console.log('server running on '+server.address().port);
    });

    const ws = new websocket({
        httpServer: server,
        autoAcceptConnections: false
    });

    const originIsAllowed = (origin) => {
        if(origin == 'alert-client') {
            return true;
        } else {
            return false;
        }
    }

    ws.on('request', (request) => {
        if(!originIsAllowed(request.origin)) {
            request.reject();
            console.log((new Date()) + 'connection from origin '+request.origin+' rejected.');
        }
        console.log("connection accepted.");

        let connection = request.accept('alert-protocol', request.origin);
        connection.on('close', (reasonCode, desc) => {
            console.log("connection is closed");
        });

        connection.on('message', (message) => {
            if(message.type === 'utf8') {
                console.log("message reviced: "+message.utf8Data);
                if(JSON.parse(message.utf8Data).message == 'Hello') {
                    connection.sendUTF(JSON.stringify({error: false, message: "OK"}));
                }
            } else {
                connection.sendUTF({error: true, message: "server is not support binary data"});
                connection.close();
            }
        });
    });

    setTimeout(() => {
        console.log("broadcast test")
        ws.broadcastUTF(JSON.stringify({
            alert: true,
            level: 1,
            systus: 'earthquake',
            test: true
        }));
    }, 5000)
})();