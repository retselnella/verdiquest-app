const db = require("../database");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "5bh(76Hn7B5<pdz";
const bcrypt = require("bcrypt");
const Coordinator = require("../models/coordinator");

const coordinator = new Coordinator(db);

async function registerOrganization(request, response) {
  try {
    const { organizationName, organizationAddress, organizationType } =
      request.body;

    const coordinatorData = {
      organizationName,
      organizationAddress,
      organizationType,
    };

    const insertedOrganizationId = await coordinator.insertOrganization(
      coordinatorData
    );
    response.status(200).send({
      message: "Organization registered successfully!",
      organizationId: insertedOrganizationId,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function registerCoordinator(request, response) {
  try {
    const {
      firstName,
      middleInitial,
      lastName,
      gender,
      phoneNumber,
      street,
      barangay,
      city,
      province,
      username,
      password,
    } = request.body;

    const existingUser = await coordinator.getUserByUsername(username);
    if (existingUser) {
      return response.status(400).send({
        message: "Username already exists. Please choose a different username.",
      });
    }

    // Hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(password, 10);

    const organizationId = await coordinator.getLastInsertedOrganizationId();

    const coordinatorData = {
      firstName,
      middleInitial,
      lastName,
      gender,
      phoneNumber,
      street,
      organizationId,
      barangay,
      city,
      province,
      username,
      password: hashedPassword,
    };

    const insertedUserId = await coordinator.insertCoordinator(coordinatorData);

    // Generate a JWT for the registered user
    const tokenPayload = { id: insertedUserId, username };
    const token = jwt.sign(tokenPayload, SECRET_KEY, {
      expiresIn: "1h", // Set the token to expire in 1 hour
    });

    response.status(200).send({
      message: "User registered successfully!",
      userId: insertedUserId,
      token,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function loginCoordinator(request, response) {
  try {
    const { username, password } = request.body;

    // Validate request data
    if (!username || !password) {
      return response
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const coordinatorData = { username };
    const fetchedUser = await coordinator.fetchUser(coordinatorData);

    if (fetchedUser) {
      const isMatch = await bcrypt.compare(password, fetchedUser.Password);

      if (isMatch) {
        // Generate a JWT with an expiration
        const tokenPayload = {
          id: fetchedUser.id,
          username: fetchedUser.username,
        };

        const token = jwt.sign(tokenPayload, SECRET_KEY, {
          expiresIn: "1h", // Set the token to expire in 1 hour
        });

        response.json({
          success: true,
          coordinator: fetchedUser,
          token: token,
        });
      } else {
        // Incorrect password
        response
          .status(401)
          .json({ success: false, message: "Incorrect password" });
      }
    } else {
      // User not found
      response
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: "Server error." });
  }
}

async function createTask(request, response) {
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

    const insertTaskId = await coordinator.insertTask(taskData);

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
}

async function getDifficulty(request, response) {
  try {
    const fetchedTable = await coordinator.fetchDifficulty();
    return response.json({
      success: true,
      fetchTable: fetchedTable,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}
async function getTasks(request, response) {
  try {
    const { organizationId } = request.query;

    const coordinatorData = { organizationId };
    const fetchedTable = await coordinator.fetchTasks(coordinatorData);
    return response.json({
      success: true,
      fetchTable: fetchedTable,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function deleteTask(request, response) {
  try {
    const { taskId } = request.body;

    const coordinatorData = { taskId };
    const result = await coordinator.deleteTasks(coordinatorData);
    return response.json({
      success: true,
      taskId: result,
      message: "Task deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function updateTask(request, response) {
  try {
    const {
      taskName,
      taskDescription,
      taskPoints,
      taskDuration,
      difficultyId,
      taskId,
    } = request.body;

    const taskData = {
      taskName,
      taskDescription,
      taskPoints,
      taskDuration,
      difficultyId,
      taskId,
    };

    const result = await coordinator.updateTask(taskData);
    return response.json({
      message: "Task updated successfully!",
      success: true,
      result: result,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function getUserTask(request, response) {
  try {
    const { taskId } = request.body;
    const taskData = { taskId };
    const fetchedTable = await coordinator.fetchUserTasks(taskData);
    return response.json({
      success: true,
      fetchTable: fetchedTable,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function updateUserTask(request, response) {
  try {
    const { Status, userDailyTaskId } = request.body;

    // Basic input validation
    if (!Status || !userDailyTaskId) {
      return response
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const userTask = {
      Status,
      userDailyTaskId,
    };

    const result = await coordinator.updateUserDailyTask(userTask);
    return response.json({
      message: "User Daily Task updated successfully!",
      success: true,
      result: result,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: "Server error" });
  }
}

async function deleteEvent(request, response) {
  try {
    const { eventId } = request.body;

    const eventData = { eventId };
    const result = await coordinator.deleteEvent(eventData);
    return response.json({
      success: true,
      eventId: result,
      message: "Event deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function createEvent(request, response) {
  try {
    const {
      organizationId,
      eventName,
      eventDescription,
      eventVenue,
      eventDate,
      eventPoints,
    } = request.body;

    const eventData = {
      organizationId,
      eventName,
      eventDescription,
      eventVenue,
      eventDate,
      eventPoints,
    };

    const insertEventId = await coordinator.createEvent(eventData);

    response.status(200).send({
      message: "Event registered successfully!",
      taskId: insertEventId,
      success: true,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function getEvents(request, response) {
  try {
    const { organizationId } = request.body;
    console.log(organizationId);

    const eventData = { organizationId };
    const fetchedTable = await coordinator.fetchEvent(eventData);
    return response.json({
      success: true,
      fetchTable: fetchedTable,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function updateEvent(request, response) {
  try {
    const {
      eventName,
      eventDescription,
      eventVenue,
      eventDate,
      eventPoints,
      eventId,
    } = request.body;

    const eventData = {
      eventName,
      eventDescription,
      eventVenue,
      eventDate,
      eventPoints,
      eventId,
    };

    const result = await coordinator.updateEvent(eventData);
    return response.json({
      message: "Event updated successfully!",
      success: true,
      result: result,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function getParticipants(request, response) {
  try {
    const { eventId } = request.body;
    const eventData = { eventId };
    const fetchedTable = await coordinator.fetchParticipants(eventData);
    return response.json({
      success: true,
      fetchTable: fetchedTable,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}
async function getParticipantsVerified(request, response) {
  try {
    const { eventId } = request.body;
    const eventData = { eventId };
    const fetchedTable = await coordinator.fetchParticipantsVerified(eventData);
    return response.json({
      success: true,
      fetchTable: fetchedTable,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function updateParticipant(request, response) {
  try {
    const { Status, participantId } = request.body;

    // Basic input validation
    if (!Status || !participantId) {
      return response
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const participantData = {
      Status,
      participantId,
    };

    const result = await coordinator.updateParticipant(participantData);
    return response.json({
      message: "Participant updated successfully!",
      success: true,
      result: result,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ success: false, message: "Server error" });
  }
}

async function getCountParticipants(request, response) {
  try {
    const { eventId } = request.body;
    console.log(eventId);
    const eventData = { eventId };
    const countParticipants = await coordinator.fetchCountParticipants(
      eventData
    );
    return response.json({
      success: true,
      count: countParticipants,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}
async function getCountTakers(request, response) {
  try {
    const { taskId } = request.body;
    const taskData = { taskId };
    const countTakers = await coordinator.fetchUserTaskSelected(taskData);
    return response.json({
      success: true,
      count: countTakers,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function getUserCountTakers(request, response) {
  try {
    const { taskId } = request.body;
    const taskData = { taskId };
    const countTakers = await coordinator.fetchTaskTakers(taskData);
    return response.json({
      success: true,
      count: countTakers,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function updateCoordinator(request, response) {
  try {
    const {
      userName,
      newPassword,
      firstName,
      middleInitial,
      lastName,
      coordinatorId,
      personId,
    } = request.body;
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const coordinatorData = {
      userName,
      newPassword: hashedPassword,
      firstName,
      middleInitial,
      lastName,
      coordinatorId,
      personId,
    };

    const result = await coordinator.updateCoordinator(coordinatorData);
    response.status(200).send({
      message: "Coordinator updated successfully!",
      result: result,
      success: true,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function fetchCoordinator(request, response) {
  try {
    const { coordinatorId } = request.body;
    const coordinatorData = { coordinatorId };
    const fetchedUser = await coordinator.fetchUserByCoordinatorId(
      coordinatorData
    );
    return response.json({
      success: true,
      fetchedUser: fetchedUser,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

async function updateOrganization(request, response) {
  try {
    const { orgImage, orgName, orgAddress, orgType, orgId } = request.body;

    const organizationData = {
      orgImage,
      orgName,
      orgAddress,
      orgType,
      orgId,
    };

    const result = await coordinator.updateOrganization(organizationData);
    response.status(200).send({
      message: "Organization updated successfully!",
      result: result,
      success: true,
    });
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ message: "Server error", error: error.message });
  }
}

module.exports = {
  registerOrganization,
  registerCoordinator,
  loginCoordinator,
  createTask,
  getDifficulty,
  getTasks,
  deleteTask,
  updateTask,
  getUserTask,
  updateUserTask,
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getParticipants,
  updateParticipant,
  getCountParticipants,
  getParticipantsVerified,
  getCountTakers,
  getUserCountTakers,
  updateCoordinator,
  fetchCoordinator,
  updateOrganization,
};
