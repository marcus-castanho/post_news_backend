const { connectDB } = require('../../db/db.js')

const eraseNews = async (newsBody) => {
    let { news_id, title, content, category } = newsBody;
    let deletedNews = 'fail';

    const getCurrentNews = 'SET @news_id = ?; SELECT n.*, c.category from news n JOIN category c WHERE n.news_id = @news_id AND c.category_id = (SELECT n.category_id from news n WHERE n.news_id = @news_id);';
    const getNumOfUsesCategory = 'SET @category_id = ?; SELECT n.news_id, c.* FROM news n JOIN category c WHERE n.category_id = @category_id AND c.category_id = @category_id;';
    const deleteCategory = 'DELETE from category c WHERE c.category = ?';
    const deleteNews = 'DELETE from news n WHERE n.news_id = ?';

    try {
        const dbConnection = await connectDB();

        currentNews = (await dbConnection.query(getCurrentNews, [news_id]))[0][1][0];
        if(currentNews == undefined) deletedNews = 'news_not_found';

        const numUsesCategory = (await dbConnection.query(getNumOfUsesCategory, [currentNews.category_id]))[0][1];

        if (numUsesCategory.length < 2) {
            await dbConnection.query(deleteCategory, [currentNews.category]);
        }

        await dbConnection.query(deleteNews, [news_id]);
        
        currentNews = await (await dbConnection.query(getCurrentNews, [news_id]))[0][1][0];
        if(currentNews == undefined) deletedNews = 'success';
    }
    catch (err) {
        console.log(err);
    }

    return deletedNews;
}

module.exports = {
    eraseNews
}