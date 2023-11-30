const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./src/database/routes/userRoutes");
const coordinatorRoutes = require("./src/database/routes/coordinatorRoutes");
const imageRoutes = require("./src/database/routes/imageRoutes");
const imageUpload = require("./src/database/middleware/multerConfig");
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/img", express.static(path.join(__dirname, "src/database/images")));
app.use("/user", userRoutes);
app.use("/coordinator/upload", imageRoutes);
app.use("/coordinator", coordinatorRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
