const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

var corsOptions = {
  origin: "http://localhost:4200",
};
app.use(cors(corsOptions));
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
app.get("/", (req, res) => {
  res.json({ message: "welcome to app" });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// connect to database
const db = require("./app/models");
const Role = db.role;
db.mongoose
  .connect("mongodb://localhost:27017/bouslimi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDb");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection ");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection ");
      });
    }
  });
}

app.listen(3000, () => {
  console.log("server is runing on http://localhost:3000");
});
