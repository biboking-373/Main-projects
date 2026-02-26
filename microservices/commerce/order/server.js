require("dotenv").config();

const express = require("express");
const db = require("./config/database");
// this is where the orderrouter will be
const orderRouter = require("./router/order")

const app = express();
app.use(express.json());
app.use("/order", orderRouter);
// app.use the router for order
const Port = process.env.PORT || 809;

app.listen(Port, () => {
    console.log(`Server is alive on Port: ${Port}`)
})