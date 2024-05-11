const Order = require("./pedido.model")

async function getOrderMongo(filters) {
    filters.isActive = true;
    const orderCount = await Order.countDocuments(filters);
    const filteredOrders = await Order.find(filters);

    return {
        results: filteredOrders,
        "Total Orders": orderCount
    };
}

async function createOrderMongo(data) {
    const orderCreated = await Order.create(data);

    return orderCreated;
}

async function updateOrderMongo(id, changes) {
    const result = await Order.findByIdAndUpdate(id, changes);

    return result;
}

async function deleteOrderMongo(id) {
    const result = await Order.findByIdAndUpdate(id, { isActive: false }, { new: true });

    return result;
}

module.exports = {
    createOrderMongo,
    getOrderMongo,
    updateOrderMongo,
    deleteOrderMongo
};
