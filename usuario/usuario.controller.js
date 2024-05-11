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

    // Hashear la contraseña antes de guardar el usuario
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Pasar la contraseña hasheada junto con otros datos del usuario
    const userData = {
        ...data,
        password: hashedPassword
    };

    const userCreated = await createUserMongo(userData);

    return userCreated;
}

async function updateUser(data) {
    const { _id, password, ...otherChanges } = data;

    // Solo hashear la contraseña si se proporciona una nueva
    let changes = otherChanges;
    if (password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        changes = { ...otherChanges, password: hashedPassword };
    }

    const userUpdated = await updateUserMongo(_id, changes);

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
