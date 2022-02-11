const assert = require('assert').strict;
const { createNews } = require('../../app/useCases/postNewsUseCase');
const { putNews } = require('../../app/useCases/updateNewsUseCase');
const { getNews } = require('../../app/useCases/searchNewsUseCase');
const { eraseNews } = require('../../app/useCases/deleteNewsUseCase');
const { truncate } = require('../utils/truncate.js');

testNews();

async function testNews() {
    let testSynthesis = { total: 0, passed: 0, failed: 0 };

    await testCreate(testSynthesis);
    await testUpdate(testSynthesis);
    await testSearch(testSynthesis);

    async function testCreate(testSynthesis) {
        await truncate();

        const newsBody = {
            title: 'titulo',
            content: 'conteudo',
            category: 'categoria'
        };

        const news = await createNews(newsBody);

        console.log(`It should create the news.`);
        console.log(`\tExpect the created news to have all properties`);

        try {
            assert.ok(news.hasOwnProperty('news_id'));
            assert.ok(news.hasOwnProperty('category_id'));
            assert.equal(news['title'], newsBody['title']);
            console.log('\x1b[42m%s\x1b[0m', '\tPassed');
            testSynthesis.passed++;
        }
        catch (err) {
            console.log('\x1b[41m%s\x1b[0m', '\tFailed');
            testSynthesis.failed++;
            console.log(err);
        }
        testSynthesis.total++;
    }

    async function testUpdate(testSynthesis) {
        await truncate();

        const newsBody = {
            title: 'titulo',
            content: 'conteudo',
            category: 'categoria'
        };

        const { news_id } = await createNews(newsBody);

        const newsBodyUpdate = {
            news_id,
            title: 'titulo1',
            content: 'conteudo1',
            category: 'categoria1'
        };

        const news = await putNews(newsBodyUpdate);

        console.log(`It should update the news with provided data.`);
        console.log(`\tExpect news to update all modified fields`);

        try {
            assert.equal(news['news_id'], news_id);
            assert.equal(news['title'], newsBodyUpdate['title']);
            assert.equal(news['content'], newsBodyUpdate['content']);
            assert.equal(news['category'], newsBodyUpdate['category']);
            console.log('\x1b[42m%s\x1b[0m', '\tPassed');
            testSynthesis.passed++;
        }
        catch (err) {
            console.log('\x1b[41m%s\x1b[0m', '\tFailed');
            testSynthesis.failed++;
            console.log(err);
        }
        testSynthesis.total++;
    }

    async function testSearch(testSynthesis){
        await truncate();

        const newsBody = {search_input: 'titulo3'};

        const newsBody1 = {
            title: 'titulo1',
            content: 'conteudo1',
            category: 'categoria1'
        };

        const newsBody2 = {
            title: 'titulo2',
            content: 'conteudo2',
            category: 'categoria2'
        };

        const newsBody3 = {
            title: 'titulo3',
            content: 'conteudo3',
            category: 'categoria3'
        };

        await createNews(newsBody1);
        await createNews(newsBody2);
        const {news_id} = await createNews(newsBody3);

        const searchResult = await getNews(newsBody);

        console.log(`It should list object of news that contain "titulo3".`);
        console.log(`\tExpect a single element array contaning one object that has title equal "title3" `);

        try {
            assert.equal(searchResult.length, 1);
            assert.equal(searchResult['news_id'], news_id);
            assert.equal(searchResult['title'], newsBody3['title']);
            assert.equal(searchResult['content'], newsBody3['content']);
            assert.equal(searchResult['category'], newsBody3['category']);
            console.log('\x1b[42m%s\x1b[0m', '\tPassed');
            testSynthesis.passed++;
        }
        catch (err) {
            console.log('\x1b[41m%s\x1b[0m', '\tFailed');
            testSynthesis.failed++;
            console.log(err);
        }
        testSynthesis.total++;
    }

    console.log(`Tests:\n\tTotal:${testSynthesis.total}\t\tPassed:${testSynthesis.passed}\tFailed:${testSynthesis.failed}`);

    process.exit();
}