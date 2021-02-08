const { response } = require('express');
const { formatDate } = require('./format-time.js');

function handleGET(req, res, users) {
    var responseContent;

    if (req.query.type == 'user_info' && users.GetUser(req.query.name)) {
        res.type('json');
        var user = users.GetUser(req.query.name);
        responseContent = {
            'name' : user.name,
            'sessionStartTimeStamp' : user.sessionStartTimeStamp,
            'isWorking' : user.isWorking,
            'isDistance' : user.sessionIsDistance,
        };
        //console.log(`${formatDate(new Date(Date.now()))} [User] Serving json info on user ${user.name}`);
    } else if (req.query.type == 'users_info') {
        res.type('json');
        responseContent = [];
        for (var u in users.users) {
            responseContent.push(
                {
                    'name' : users.users[u].name,
                    'sessionStartTimeStamp' : users.users[u].sessionStartTimeStamp,
                    'sessionLength' : users.users[u].SessionLength(),
                    'isWorking' : users.users[u].isWorking,
                    'isDistance' : users.users[u].sessionIsDistance,
                }
            );
        }
        //console.log(`${formatDate(new Date(Date.now()))} [User] Serving json info on all users`);
    } else {
        res.status(504);
        responseContent = 'Bad Request';
    }
    
    res.send(responseContent);
}

function handlePOST(req, res, users) {
    if (req.query.type == 'start_session' 
        && users.GetUser(req.query.name) 
        && (req.query.isDistance == 'false' 
        || req.query.isDistance == 'true')) {
        var user = users.GetUser(req.query.name);
        if (user.StartSession(req.query.isDistance == 'true')) {
            console.log(`${formatDate(new Date(Date.now()))} [User] ${user.name} : Session started (is Distance : ${user.sessionIsDistance}).`);
            res.status(200).end('Session started successfully');
        } else {
            res.status(409).end('Session already started');
        }
    } else if (req.query.type == 'end_session' && users.GetUser(req.query.name)) {
        var user = users.GetUser(req.query.name);
        var wasWorking = user.isWorking;
        user.EndSession();
        if (wasWorking) {
            res.status(200).end('Session Ended');
        } else {
            res.status(409).end('No session to end');
        }
        
    } else {
        res.status(400).end('Bad Request');
    }
}

module.exports.handleGET = handleGET;
module.exports.handlePOST = handlePOST;