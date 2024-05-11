const User = require("./usuario.model")

async function getUserMongo(filters) {
    filters.isActive = true;
    const filteredUsers = await User.find(filters);
    
    return filteredUsers;
}

async function createUserMongo(data) {
    const userCreated = await User.create(data);

    return userCreated;
}

async function updateUserMongo(id, changes) {
    const result = await User.findByIdAndUpdate(id, changes);

    return result
}

async function deleteUserMongo(id) {
    const result = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });

    return result;
}

module.exports = {
    createUserMongo,
    getUserMongo,
    updateUserMongo,
    deleteUserMongo
};