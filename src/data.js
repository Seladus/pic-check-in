const Database = require('better-sqlite3');
const db = require('better-sqlite3');
const { formatDate } = require('./format-time.js');

class Data {
    constructor (path) {
        this.db = new Database(path);
    }

    GetUsers() {
        var sql = `SELECT * FROM users;`;
        const rows = this.db.prepare(sql).all();
        return rows;
    }

    GetSessions() {
        var sql = `SELECT * FROM sessions;`;
        const rows = this.db.prepare(sql).all();
        return rows;
    }

    GetSessionsPosteriorToDate(timestamp) {
        var sql = `SELECT * FROM sessions WHERE start_timestamp > ${timestamp};`;
        const rows = this.db.prepare(sql).all();
        return rows;
    }

    GetUserSessionsPosteriorToDate(timestamp, user_id) {
        var sql = `SELECT * FROM sessions WHERE start_timestamp > ${timestamp} AND user_id = ${user_id};`;
        const rows = this.db.prepare(sql).all();
        return rows;
    }

    GetUserSessions(user_id) {
        var sql = `SELECT * FROM sessions WHERE user_id = ${user_id};`;
        const rows = this.db.prepare(sql).all();
        return rows;
    }

    InsertSession(user_id, start, end, is_distance) {
        var sql = `INSERT INTO sessions (user_id, start_timestamp, end_timestamp, is_distance) values (${user_id}, ${start}, ${end}, ${is_distance});`;
        try {
            this.db.prepare(sql).run();
            return true;
        } catch (err) {
            return false;
        }
    }
}

module.exports = Data;