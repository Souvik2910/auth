const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')

const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const userAuth = require("./middlewares/userAuth");
const session = require('express-session');
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'abhishek',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({
    extended: true
}));



app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");

dbDriver = "mongodb+srv://rajublog:n6EBEDZDaeE7AgII@cluster0.39sxq.mongodb.net/Authapijwt";

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const apiRoute = require("./routes/apiRoute");

app.use(userAuth.authJwt);

app.use(userRoute);
app.use(authRoute);
app.use("/api", apiRoute);

port = process.env.PORT || 9008;

mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log("DB Connected...");
        console.log(`App Running On http://localhost:${port}`);
    })
}).catch(err => {
    console.log(err);
})