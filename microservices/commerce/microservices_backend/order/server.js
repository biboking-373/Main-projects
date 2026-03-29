const express = require("express");
require("dotenv").config();
require("./config/database");
require("./config/createTables"); // ✅ auto creates tables on startup

const orderRoutes = require("./router/order");

const app = express();
app.use(express.json());
app.use("/order", orderRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Order service running on port ${process.env.PORT}`);
});