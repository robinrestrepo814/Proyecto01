// pedido.route.js
const express = require('express')
const router = express.Router();
const { readOrderWithFilters, createOrder, updateOrder, deleteOrder } = require("./pedido.controller");
const { respondWithError } = require('../utils/functions');
const authenticateToken = require('../middlewares/authMiddleware');

async function GetOrders(req, res) {
    try {
        const searchResults = await readOrderWithFilters(req.query);

        res.status(200).json({
            ...searchResults
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}

async function PostOrder(req, res) {
    try {
        await createOrder(req.body);

        res.status(200).json({
            message: "Success👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

async function PatchOrders(req, res) {
    try {
        await updateOrder(req.body);

        res.status(200).json({
            message: "Success👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

async function DeleteOrders(req, res) {
    try {
        await deleteOrder(req.params.id);

        res.status(200).json({
            message: "Success👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", authenticateToken, GetOrders);
router.post("/", authenticateToken, PostOrder);
router.patch("/", authenticateToken, PatchOrders);
router.delete("/:id", authenticateToken, DeleteOrders);

module.exports = router;
