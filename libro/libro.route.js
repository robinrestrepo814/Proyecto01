// libro.route.js
const express = require('express')
const router = express.Router();
const { readBookWithFilters, createBook, updateBook, deleteBook } = require("./libro.controller");
const { respondWithError } = require('../utils/functions');
const authenticateToken = require('../middlewares/authMiddleware');

async function GetBooks(req, res) {
    try {
        const searchResults = await readBookWithFilters(req.query);

        res.status(200).json({
            ...searchResults
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}

async function PostBook(req, res) {
    try {
        await createBook(req.body);

        res.status(200).json({
            message: "Success. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

async function PatchBooks(req, res) {
    try {
        await updateBook(req.body);

        res.status(200).json({
            message: "Success. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

async function DeleteBooks(req, res) {
    try {
        await deleteBook(req.params.id);

        res.status(200).json({
            message: "Success. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", GetBooks);  // Public access for READ
router.post("/", authenticateToken, PostBook);
router.patch("/", authenticateToken, PatchBooks);
router.delete("/:id", authenticateToken, DeleteBooks);

module.exports = router;
