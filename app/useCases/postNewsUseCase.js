const { connectDB } = require('../../db/db.js')

const createNews = async (newsBody) => {
    let { title, content, category } = newsBody;
    let createdNews;

    const insertCategory = 'SET @category = ?; INSERT INTO category (category) VALUES (@category) ON DUPLICATE KEY UPDATE category = @category';
    const getCategoryId = 'SELECT category_id FROM category WHERE category = ?';
    const insertNews = 'INSERT INTO news (title, content, category_id) VALUES(?,?,?)';
    const getCreatedNews = 'SELECT * from news FULL JOIN category WHERE news_id = (SELECT LAST_INSERT_ID());';

    try{
        const dbConnection = await connectDB();

        await dbConnection.query(insertCategory, [category]);
        const category_id = (await dbConnection.query(getCategoryId, [category]))[0][0].category_id;
        await dbConnection.query(insertNews, [title, content, category_id]);
        const [rows] = await dbConnection.query(getCreatedNews);

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
