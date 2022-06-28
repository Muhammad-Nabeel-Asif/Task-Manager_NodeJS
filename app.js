const express = require("express");

const connectDB = require("./db/connect");
const tasks = require("./routes/tasks");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

// --- express body-parser middleware ---
app.use(express.json({ limit: "10kb" }));

// --- tasks routes ---
app.use("/api/v1/tasks", tasks);

// --- not found --- middleware
app.use(notFound);

// --- error handler --- middleware
app.use(errorHandler);

(function initializeDatabaseAndServer() {
  connectDB()
    .then(() => {
      console.log("Database Connected...");
      app.listen(port, (error) => {
        if (error) console.log("Error in Server Setup");
        console.log(`App running on port ${port}`);
      });
    })
    .catch((error) => console.log("Database Error :", error));
})();
