DROP TABLE users;

CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    user_name TEXT UNIQUE NOT NULL,
    email TEXT,
    weekly_work_time INTEGER NOT NULL
);

DROP TABLE sessions;

CREATE TABLE sessions (
    session_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    start_timestamp INTEGER NOT NULL,
    end_timestamp INTEGER NOT NULL,
    is_distance INTEGER NOT NULL, 
    length INTEGER GENERATED ALWAYS AS (end_timestamp - start_timestamp) STORED,
    FOREIGN KEY (user_id)
        REFERENCES users (user_id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
);

/* INSERT INTO users (user_name, email, weekly_work_time) VALUES ("username", "email", <time_to_work>); */