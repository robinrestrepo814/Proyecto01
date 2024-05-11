const { throwCustomError } = require("../utils/functions");
const { createOrderMongo, getOrderMongo, updateOrderMongo, deleteOrderMongo } = require("./pedido.actions");

function validateStatus(status) {
    const validStatuses = ["In Progress", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
        throwCustomError(400, "Invalid status. Allowed statuses are: 'In Progress', 'Completed', 'Cancelled'.");
    }
}

async function readOrderWithFilters(query) {
    const { initialDate, finalDate } = query;

    if (!initialDate || !finalDate) {
        throwCustomError(400, "You must provide both the initial and final dates.");
    }

    const filters = {
        date: {
            $gte: new Date(initialDate),
            $lte: new Date(finalDate)
        },
        isActive: true
    };

    const searchResults = await getOrderMongo(filters);

    return searchResults;
}

async function createOrder(data) {
    validateStatus(data.status);
    const orderCreated = await createOrderMongo(data);
    return orderCreated;
}

async function updateOrder(data) {
    const { _id, status } = data;
    validateStatus(status);
    
    const changes = { status };
    const orderUpdated = await updateOrderMongo(_id, changes);
    return orderUpdated;
}

function deleteOrder(id) {
    const orderDeleted = deleteOrderMongo(id);

    return orderDeleted;
}

module.exports = {
    readOrderWithFilters,
    createOrder,
    updateOrder,
    deleteOrder
}
