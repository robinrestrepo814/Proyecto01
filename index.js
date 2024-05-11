const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({});
})

const userRoutes = require("./usuario/usuario.route")
app.use('/user', userRoutes);
const bookRoutes = require("./libro/libro.route")
app.use('/book', bookRoutes);
const orderRoutes = require("./pedido/pedido.route")
app.use('/order', orderRoutes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error(error))

app.listen(3000);
