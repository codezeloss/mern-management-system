const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// MIDDLEWARES
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

// Route
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

// Listen to server
const PORT = 5000 || Number.parseInt(process.env.PORT);
app.listen(PORT, () => {
  console.log("::: 🚀 Server has started :::".yellow.bold);
});
