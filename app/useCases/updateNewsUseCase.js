const { connectDB } = require('../../db/db.js')

const putNews = async (newsBody) => {
    let { news_id, title, content, category } = newsBody;
    let updatedNews = 'fail';

    const getCurrentNews = 'SET @news_id = ?; SELECT n.*, c.category from news n JOIN category c WHERE n.news_id = @news_id AND c.category_id = (SELECT n.category_id from news n WHERE n.news_id = @news_id);';
    const getNumOfUsesCategory = 'SET @category_id = ?; SELECT n.news_id, c.* FROM news n JOIN category c WHERE n.category_id = @category_id AND c.category_id = @category_id;';
    const deleteCategory = 'DELETE from category c WHERE c.category = ?';
    const insertCategory = 'SET @category = ?; INSERT INTO category (category) VALUES (@category) ON DUPLICATE KEY UPDATE category = @category';
    const getCategoryId = 'SELECT category_id FROM category WHERE category = ?';
    const updateNews = 'UPDATE news SET title = ?, content = ?, category_id = ? WHERE news_id = ? ';
    const getUpdatedNews = 'SELECT n.*, c.category from news n JOIN category c WHERE n.news_id = ? AND c.category_id = ?;';

    try {
        const dbConnection = await connectDB();

        const currNewsObj = (await dbConnection.query(getCurrentNews, [news_id]))[0][1][0];
        if(currNewsObj == undefined) updatedNews = 'news_not_found';

        if (currNewsObj.category !== category) {
            const numUsesCategory = (await dbConnection.query(getNumOfUsesCategory, [currNewsObj.category_id]))[0][1];

            if (numUsesCategory.length < 2) {
                await dbConnection.query(deleteCategory, [currNewsObj.category]);
            }

            await dbConnection.query(insertCategory,[category]);
        }

        const category_id = (await dbConnection.query(getCategoryId, [category]))[0][0].category_id;
        await dbConnection.query(updateNews,[title, content, category_id, news_id]);
        const [rows] = await dbConnection.query(getUpdatedNews,[news_id,category_id]);

        updatedNews = rows[0]

    }
    catch (err) {
        console.log(err);
    }

    return updatedNews;
}

module.exports = {
    putNews
}