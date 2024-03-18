import express from 'express'
import session from "express-session";
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import exploreRoutes from './routes/explore.route.js'
import dotenv from 'dotenv'
import cors from 'cors'
import  path from 'path';
import connectMongoDB from './db/connectMongoDB.js'
import passport from 'passport'
import "./passport/github.auth.js"


dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const _dirname = path.resolve();

app.use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors())

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/explore",exploreRoutes)

app.use(express.static(path.join(_dirname,"/frontend/dist")))

app.get("*",(req,res) => {
    res.sendFile(path.join(_dirname,"frontend","dist","index.html"))
})

app.listen(PORT,() => {
    console.log(`Server starts on http://localhost:${PORT}`);
    connectMongoDB();
})