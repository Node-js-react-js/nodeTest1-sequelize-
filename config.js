module.exports = {
    "database": {
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "mysql123",
        "database": "testdb"
    },
    "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
    }
};