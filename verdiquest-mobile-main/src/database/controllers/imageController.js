const upload = require("../middleware/multerConfig");
const Image = require("../models/image");
const db = require("../database");

const img = new Image(db);

async function updateOrgProfile(request, response) {
  upload.single("image")(request, response, async (err) => {
    if (err) {
      return response.status(500).json({ error: err.message });
    }
    const filename = request.file.filename; // Assuming this is the path of the uploaded image
    const organizationId = request.body.organizationId;

    try {
      const result = await img.insertImageOrgProfile(filename, organizationId);
      response.json(result);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  });
}
async function uploadTaskImage(request, response) {
  upload.single("image")(request, response, async (err) => {
    if (err) {
      return response.status(500).json({ error: err.message });
    }
    const filename = request.file.filename; // Assuming this is the path of the uploaded image

    try {
      const {
        difficultyId,
        organizationId,
        taskName,
        taskDescription,
        taskDuration,
        taskPoints,
        Status,
      } = request.body;

      const taskData = {
        difficultyId,
        organizationId,
        taskName,
        taskDescription,
        taskDuration,
        taskPoints,
        Status,
      };

      const insertTaskId = await img.insertTaskImage(filename, taskData);

      response.status(200).send({
        message: "Task registered successfully!",
        taskId: insertTaskId,
        success: true,
      });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .send({ message: "Server error", error: error.message });
    }
  });
}

async function updateTaskImage(request, response) {
  upload.single("image")(request, response, async (err) => {
    if (err) {
      return response.status(500).json({ error: err.message });
    }
    const filename = request.file.filename; // Assuming this is the path of the uploaded image
    const taskId = request.body.taskId;

    try {
      const result = await img.updateTaskImage(filename, taskId);
      response.json(result);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  });
}

module.exports = { updateOrgProfile, uploadTaskImage, updateTaskImage };
