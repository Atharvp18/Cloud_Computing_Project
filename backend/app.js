const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const path = require('path')

const _dirname = path.dirname("")
const buildPath = path.join(_dirname  , "../frontend/build");

const app = express();
// app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../frontend/build/index.html"),
        // "../frontend/build/index.html",
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const PORT = 5000;
mongoose
  .connect('mongodb+srv://atharvp18:atharvp1801@cluster0.2pcnjfv.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log(`Connected to Database`);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// mongoose
//   .connect(
//     "mongodb+srv://atharvp18:atharvp1801@cluster0.2pcnjfv.mongodb.net/?retryWrites=true&w=majority",
//     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
//   )
//   .then(() => {
//     app.listen(PORT);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
