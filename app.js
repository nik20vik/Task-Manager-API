const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Middleware
app.use(express.static("./public"));
app.use(express.json());

/* 
All Routes :
app.get('/api/v1/tasks')          - get all the tasks
app.post('/api/v1/tasks')         - create a new task
app.get('/api/v1/tasks/:id')      - get a single task
app.patch('/api/v1/tasks/:id')    - update a single task
app.delete('/api/v1/tasks/:id')   - delete a single task
*/

// Routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// Only starting the server, if we first connect to our database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening at port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
