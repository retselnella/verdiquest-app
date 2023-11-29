const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/database/routes/userRoutes");
const coordinatorRoutes = require("./src/database/routes/coordinatorRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/coordinator", coordinatorRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
