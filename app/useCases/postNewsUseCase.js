const { connectDB } = require('../../db/db.js')

const createNews = async (newsBody) => {
    let { title, content, category } = newsBody;
    let createdNews;

    const insertCategory = 'SET @category = ?; INSERT INTO category (category) VALUES (@category) ON DUPLICATE KEY UPDATE category = @category';
    const getCategoryId = 'SELECT category_id FROM category WHERE category = ?';
    const insertNews = 'INSERT INTO news (title, content, category_id) VALUES(?,?,?)';
    const getCreatedNews = 'SELECT n.*, c.category from news n JOIN category c WHERE n.news_id = LAST_INSERT_ID() AND c.category_id = ?;';

    try{
        const dbConnection = await connectDB();

        await dbConnection.query(insertCategory, [category]);
        const category_id = (await dbConnection.query(getCategoryId, [category]))[0][0].category_id;
        await dbConnection.query(insertNews, [title, content, category_id]);
        const [rows] = await dbConnection.query(getCreatedNews,[category_id]);

        createdNews = rows[0];
    }
    catch(err){
        console.log(err);
    }

    return createdNews;
}

module.exports = {
    createNews
}
