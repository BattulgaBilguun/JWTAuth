const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  userRoutes = require("./routes/user");
  
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/usersdb", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("connected to db");
  } catch (error) {
    handleError(error);
  }
  process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
  });

require("dotenv").config();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(userRoutes)

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is on 8080");
});
