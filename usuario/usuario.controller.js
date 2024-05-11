const { throwCustomError } = require("../utils/functions");
const { createUserMongo, getUserMongo, updateUserMongo, deleteUserMongo } = require("./usuario.actions");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function readUserWithFilters(query) {
    const { name, password } = query;

    const searchResults = await getUserMongo(query);

    return searchResults;
}

async function createUser(data) {
    const { name, password } = data;

    const userCreated = await createUserMongo(data);

    return userCreated;
}


function updateUser(data) {
    const { _id, ...changes } = data;

    const userUpdated = updateUserMongo(_id, changes);

    return userUpdated;
}

function deleteUser(id) {

    const userDeleted = deleteUserMongo(id);

    return userDeleted;
}

module.exports = {
    readUserWithFilters,
    createUser,
    updateUser,
    deleteUser
}


module.exports = {
    readUserWithFilters,
    createUser,
    updateUser,
    deleteUser
}