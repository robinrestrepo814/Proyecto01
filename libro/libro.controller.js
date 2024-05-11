// libro.controller.js
const { throwCustomError } = require("../utils/functions");
const { createBookMongo, getBookMongo, updateBookMongo, deleteBookMongo } = require("./libro.actions");

async function readBookWithFilters(query) {
    const { name, author, genre, date, publisher } = query;

    const searchResults = await getBookMongo(query);

    return searchResults;
}

async function createBook(data) {
    const { name, author, genre, date, publisher } = data;

    const bookCreated = await createBookMongo(data);

    return bookCreated;
}

function updateBook(data) {
    const { _id, ...changes } = data;

    const bookUpdated = updateBookMongo(_id, changes);

    return bookUpdated;
}

function deleteBook(id) {
    const bookDeleted = deleteBookMongo(id);

    return bookDeleted;
}

module.exports = {
    readBookWithFilters,
    createBook,
    updateBook,
    deleteBook
}
