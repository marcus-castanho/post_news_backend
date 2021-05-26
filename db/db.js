const mysql = require('mysql2');

const createTables = (dbConnection) => {
    let createNewsTable = 'CREATE TABLE IF NOT EXISTS news (news_id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(20), content VARCHAR(140), category VARCHAR(20));';
    let createCategoryTable = 'CREATE TABLE IF NOT EXISTS category (category_id INT PRIMARY KEY AUTO_INCREMENT, category VARCHAR(20));';

    dbConnection.query(createNewsTable, (err, results, fields) => {
        if (err) throw err
    });

    dbConnection.query(createCategoryTable, (err, results, fields) => {
        if (err) throw err
    });

    return
}

const connectDB = async () => {
    if (global.connection && global.connection !== 'disconnected') {
        return global.connection
    }

    const dbConnection = await mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'mysql'
    });

    global.connection = dbConnection;

    dbConnection.connect((err) => {
        if (err) {
            return console.error('error: ' + err.message);
        }
    });

    createTables(dbConnection);

    return dbConnection;
}

module.exports = {
    connectDB
}
