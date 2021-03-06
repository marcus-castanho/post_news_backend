const { connectDB } = require('../../db/db.js');

const getNews = async (newsBody) => {
    let { search_input } = newsBody;
    let searchedNews;

    const searchPattern = '%' + search_input + '%';
    const getNewsLikeInput = 'SET @pattern = ?; SELECT n.*, c.category from news n JOIN category c WHERE n.title LIKE @pattern OR n.content LIKE @pattern OR c.category LIKE @pattern;';

    try {
        const dbConnection = await connectDB();

        const [rows] = await dbConnection.query(getNewsLikeInput,[searchPattern]);

        searchedNews = rows[1];
        
    }
    catch (err){
        console.log(err);
    }


    return searchedNews;
}

module.exports = {
    getNews
}