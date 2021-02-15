var fs = require('fs');
const { formatDate } = require('./format-time.js');

class User {
    constructor (userName, user_id, weekly_work_time, users, db) {
        this.name = userName;
        this.user_id = user_id;
        this.weekly_work_time = weekly_work_time;
        this.users = users;
        this.db = db;
        this.isWorking = false;
        this.sessionStartTimeStamp = null;
        this.sessionIsDistance = false;
    }

    SaveSession() {
        this.db.InsertSession(this.user_id, this.sessionStartTimeStamp, Date.now(), this.sessionIsDistance, this.SessionLength());
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
            this.users.weekly_worked_time = this.users.getWeeklyTimeWorkedPerUser();
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

function getMondayOfCurrentWeek(d)
{
    var day = d.getDay();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + (day == 0?-6:1)-day );
}

class Users {
    constructor (database) {
        this.db = database;
        this.weekly_worked_time = this.getWeeklyTimeWorkedPerUser();
        const rows = this.db.GetUsers();
        this.users = {}
        rows.forEach((row) => {
            this.users[row.user_name] = new User(row.user_name, row.user_id, row.weekly_work_time, this, this.db);
        });
    }

    getWeeklyTimeWorkedPerUser() {
        var sessions_data = this.db.GetSessionsPosteriorToDate(getMondayOfCurrentWeek(new Date(Date.now())).getTime());
        var timeWorked = {};
        sessions_data.forEach(session => {
            if (!timeWorked[session.user_id]) {
                timeWorked[session.user_id] = session.length;
            } else {
                timeWorked[session.user_id] += session.length;
            }
        });
        return timeWorked;
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
  