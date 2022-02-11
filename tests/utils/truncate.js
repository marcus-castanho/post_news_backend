const { connectDB } = require('../../db/db.js');

const truncate = async () => {

    const truncateTables = 'SET FOREIGN_KEY_CHECKS = 0; TRUNCATE news; TRUNCATE category; SET FOREIGN_KEY_CHECKS = 1;';

    try {
        const dbConnection = await connectDB();

        await dbConnection.query(truncateTables);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    truncate
}