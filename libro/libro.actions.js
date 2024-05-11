const Book = require("./libro.model")

async function getBookMongo(filters) {
    filters.isActive = true;
    const bookCount = await Book.countDocuments(filters);
    const filteredBooks = await Book.find(filters);
    
    return {
        results: filteredBooks,
        "Total Books": bookCount
    };
}

async function createBookMongo(data) {
    const bookCreated = await Book.create(data);

    return bookCreated;
}

async function updateBookMongo(id, changes) {
    const result = await Book.findByIdAndUpdate(id, changes);

    return result;
}

async function deleteBookMongo(id) {
    const result = await Book.findByIdAndUpdate(id, { isActive: false }, { new: true });

    return result;
}

module.exports = {
    createBookMongo,
    getBookMongo,
    updateBookMongo,
    deleteBookMongo
};
