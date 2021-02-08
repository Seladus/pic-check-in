var fs = require('fs');
const { formatDate } = require('./format-time.js');

class User {
    constructor (userName, path) {
        this.name = userName;
        this.path = path;
        this.isWorking = false;
        this.sessionStartTimeStamp = null;
        this.sessionIsDistance = false;
    }

    SaveSession(duration) {
        var sessionDescription = `${this.sessionStartTimeStamp},${duration},${this.sessionIsDistance}\n`;
        fs.appendFile(`${this.path}/${this.name}.data`, sessionDescription, ()=>{});
    }

    StartSession(isDistance) {
        if (!this.isWorking) {
            this.isWorking = true;
            this.sessionStartTimeStamp = Date.now();
            this.sessionIsDistance = isDistance;
            // Starting work session
            return true;
        } 
        // Work session already started
        return false;
    }

    EndSession() {
        if (this.isWorking) {
            this.SaveSession(this.SessionLength());
            console.log(`${formatDate(new Date(Date.now()))} [User] ${this.name} : Session ended.`);
        }
        this.isWorking = false;
    }

    SessionLength() {
        return this.isWorking ? (Date.now() - this.sessionStartTimeStamp) : null;
    }

    toString() {
        if (this.isWorking) {
            var length = this.SessionLength();
            var minutes = Math.floor(length/1000/60);
            return `${this.name} - working for ${minutes} minutes`;
        } else {
            return `${this.name} - not working`;
        }
    }
}

class Users {
    constructor (pathToUsers, pathToUsersData) {
        this.pathToUsers = pathToUsers;
        var data = fs.readFileSync(pathToUsers, 'utf8').split('\n');
        this.users = {};
        for (var u in data) {
            if (data[u] != "") {
                this.users[data[u]] = new User(data[u], `${pathToUsersData}`);
            }
        }
    }

    EndAllSessions() {
        for (var u in this.users) {
            this.users[u].EndSession();
        }
    }

    GetUser(userName) {
        return this.users[userName];
    }

    PrintUsers() {
        for (var u in this.users) {
            console.log(this.users[u].toString());
        }
    }
}

module.exports = Users;
  