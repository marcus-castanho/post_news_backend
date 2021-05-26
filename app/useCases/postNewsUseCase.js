const { connectDB } = require('../../db/db.js')

const createNews = async (newsBody) => {
    const dbConnection = await connectDB();

    const {title, content, category} = newsBody;

    dbConnection.query('INSERT INTO news (title, content, category) VALUES (?, ?, ?)', [title, content, category], (err, results, fields) => {
        if (err) throw err;
    })

    return
}

module.exports = {
    createNews
}
