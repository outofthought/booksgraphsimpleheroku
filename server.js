//WORKING ON DEV SERVER BUT NOT ON HEROLU SERVER accimheroku2

// Importing Modules
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

// importing files
//const routes = require("./routes");

// Define Global Variables
const app = express();
const log = console.log;
const PORT = process.env.PORT || 4000; // Step 1

// Step 2
mongoose.connect(
  process.env.MONGODB_URI,

  {
    useNewUrlParser: true
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use("/", routes);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// Step 3
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}

app.listen(PORT, () => {
  log(`Server is starting at PORT: ${PORT}`);
});
