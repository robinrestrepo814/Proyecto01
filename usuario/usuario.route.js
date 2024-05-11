const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const { readUserWithFilters, createUser, updateUser, deleteUser } = require("./usuario.controller");
const { respondWithError } = require('../utils/functions');
const authenticateToken = require('../middlewares/authMiddleware');

async function GetUsers(req, res) {
    try {
        const searchResults = await readUserWithFilters(req.query);

        res.status(200).json({
            ...searchResults
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}

async function PostUser(req, res) {
    try {
        await createUser(req.body);
        const {body} = req;

        const token = jwt.sign(body, "SECRET")
        
        console.log(token)
        
        res.status(200).json({
            message: "Success. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

async function PatchUsers(req, res) {
    try {
        await updateUser(req.body);

        res.status(200).json({
            message: "Success. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

async function DeleteUsers(req, res) {
    try {
        await deleteUser(req.params.id);

        res.status(200).json({
            message: "Success. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", authenticateToken, GetUsers);
router.post("/", PostUser);  // No authentication for CREATE
router.patch("/", authenticateToken, PatchUsers);
router.delete("/:id", authenticateToken, DeleteUsers);

module.exports = router;
