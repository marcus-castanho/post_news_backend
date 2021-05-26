const { connectDB } = require('../../db/db.js')

const findNews = async (searchStr) => {
    const dbConnection = await connectDB();

    return
}

module.exports = {
    findNews
}
