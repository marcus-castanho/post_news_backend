const { connectDB } = require('../../db/db.js')

const createNews = async (newsBody) => {
    const dbConnection = await connectDB();
    const insertValuesQuery = "INSERT INTO category (category) VALUES (?) ON DUPLICATE KEY UPDATE category = ?; SELECT * FROM category as c WHERE c.category = ?; INSERT INTO news (title, content, category_id) VALUES(?,?, (SELECT category_id FROM category WHERE category = ?));";

    let { title, content, category } = newsBody;

    title = title.toLowerCase().trim();
    content = content.toLowerCase().trim();
    category = category.toLowerCase().trim();

    dbConnection.query(insertValuesQuery, [category, category, category, title, content, category], (err, results, fields) => {
        if (err) throw err;
    });

    return
}

module.exports = {
    createNews
}
