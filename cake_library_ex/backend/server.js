require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./config/database");
const authRoutes = require("./routes/AUTH/Authroutes");
const postRoutes = require("./routes/Posts/Postroutes");
const likeRoutes = require("./routes/Likes/Likeroutes");
const commentRoutes = require("./routes/Comments/Commentroutes");


const cookie_parser = require("cookie-parser");
const cors = require("cors");

connectDb()

app.use(cors({
    origin: process.env.FRONTEND_API,  
    credentials: true  // Allow cookies
}));

app.use(express.json());
app.use(cookie_parser())

app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/like", likeRoutes);
app.use("/comment", commentRoutes);
const Port = process.env.PORT || 4000;

app.listen(Port, () => {
    console.log(`Server is alive and active on port ${Port}`)
    console.log("Bring in the requests baby!!!")
})
