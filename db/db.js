const mysql = require('mysql2/promise');

const createTables = async (dbConnection) => {
    const createNewsTable = 'CREATE TABLE IF NOT EXISTS news (news_id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(20), content VARCHAR(140), category_id INT);';
    const createCategoryTable = 'CREATE TABLE IF NOT EXISTS category (category_id INT PRIMARY KEY AUTO_INCREMENT, category VARCHAR(20) UNIQUE);';
    const alterRefNewsTable = 'ALTER TABLE news ADD FOREIGN KEY(category_id) REFERENCES category(category_id) ON DELETE SET NULL;';

    await dbConnection.query(createNewsTable);
    await dbConnection.query(createCategoryTable);
    await dbConnection.query(alterRefNewsTable);
}

const connectDB = async () => {
    let dbConnection;

    if (global.connection && global.connection !== 'disconnected') {
        return global.connection
    }

    try {
        dbConnection = await mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '123456',
            database: 'mysql',
            multipleStatements: true
        });

        global.connection = dbConnection;

        await createTables(dbConnection);
    }
    catch (err) {
        console.log(err)
    }

    return dbConnection;
}

module.exports = {
    connectDB
}
