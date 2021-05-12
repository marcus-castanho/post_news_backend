const mysql = require('mysql2');

const connectDB = async () => {
    console.log(global)
    if (global.connection && global.connection !== 'disconnected') {
        return global.connection
    }

    const dbConnection = await mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
    });

    global.connection = dbConnection;

    return dbConnection.connect();
}

module.exports = {
    connectDB
}
