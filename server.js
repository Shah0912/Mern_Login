const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport");
const path = require("path");
require('dotenv').config()

const users = require("./routes/api/users");

const app = express()



app.use(express.json());
app.use(express.urlencoded());


// DB Config
const db = process.env.mongoURI;

mongoose
    .connect(
        db, { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const router = express.Router();

app.get("/", (req, res) => {
    res.send();
    console.log("here")
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use("/api/users", users);

// For prod build
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.get("*", function(request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));