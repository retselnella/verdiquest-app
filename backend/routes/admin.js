require("dotenv").config();

const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");

const {
  createAdmin,
  checkAdminCredentials,
  createPerson,
  addCoordinator,
  getRevenue,
  addOrganization,
  addTask,
  addProduct,
  getRewards,
  editReward,
  deleteReward,
  getUserCredential,
  getCoordinatorList,
  getOrganizationList,
  getSubscriberList,
  getEvents,
  markTaskAsInactive,
  editTask,
  softDeleteTask,
  getCountUser,
  getCountCoordinator,
  getCountOrganization,
  getCountSubscriber,
  getTotalParticipants,
  getParticipants,
  getTaskNameById,
  getTasks,
  getParticipantsForTask,
  getAge,
  getRegUser,
  getTotalCompletedTask,
  getSubscriberPerMonth,
  getGender,
  getTotalRevenue,
  getSubRevenue
} = require("../util/db.js");

const router = express.Router();

const jwtMiddleware = jwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["HS256"],
  credentialsRequired: false,
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await checkAdminCredentials(username, password);

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jsonwebtoken.sign({ id: admin.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.use("/protected-endpoint", jwtMiddleware, (req, res) => {
  if (!req.auth || !req.auth.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Access admin data using req.auth
  const adminId = req.auth.adminId;
  res.status(200).json({ message: "Protected data accessed!", adminId });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await createAdmin(username, password);

    if (!admin) {
      return res.status(500).json({ message: "Server error" });
    }

    const token = jsonwebtoken.sign({ id: admin.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).json({ token, message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    if (error.message === "Username already exists") {
      res
        .status(409)
        .json({
          message:
            "Username already exists, please try another valid username.",
        });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

router.get("/users", async (req, res) => {
  const { search, filter } = req.query;

  try {
    const userData = await getUserCredential(search, filter);
    res.status(200).json(userData);
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving user data" });
  }
});

router.get("/coordinators", async (_req, res) => {
  try {
    const coordinatorData = await getCoordinatorList();
    res.status(200).json(coordinatorData);
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving coordinator data" });
  }
});

router.get("/organizations", async (_req, res) => {
  try {
    const organizationData = await getOrganizationList();
    res.status(200).json(organizationData);
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while retrieving organization data",
      });
  }
});

router.get("/subscribers", async (_req, res) => {
  try {
    const subscriberData = await getSubscriberList();
    res.status(200).json(subscriberData);
  } catch (err) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving subscriber data" });
  }
});

router.get("/transactions", async (_req, res) => {
  try {
    const transactionData = await getTransactionList();
    res.status(200).json(transactionDataData);
  } catch (err) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving subscriber data" });
  }
});

router.get("/event", async (_req, res) => {
  try {
    const eventData = await getEvents();
    res.status(200).json(eventData);
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving event data" });
  }
});

exports.markTaskAsInactive = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE dailytask SET Status = "Inactive" WHERE TaskId = ?';

    connection.query(query, [id], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

router.put("/task/:id", async (req, res) => {
  const { id } = req.params;
  const {
    taskName,
    taskDescription,
    taskDuration,
    taskPoints,
    taskDifficulty,
  } = req.body;

  try {
    const result = await editTask(
      id,
      taskName,
      taskDescription,
      taskDuration,
      taskPoints,
      taskDifficulty
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Task updated successfully" });
    } else {
      res.status(500).json({ message: "Failed to update task" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/task/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await softDeleteTask(id);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Task marked as deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to mark task as deleted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/task/inactive/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await markTaskAsInactive(id);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Task marked as inactive successfully" });
    } else {
      res.status(500).json({ message: "Failed to mark task as inactive" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/user-count", async (_req, res) => {
  try {
    const userCountResult = await getCountUser();
    const count = userCountResult[0]["COUNT(*)"];
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/coordinator-count", async (_req, res) => {
  try {
    const coordinatorCountResult = await getCountCoordinator();
    const count = coordinatorCountResult[0]["COUNT(*)"];
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/organization-count", async (_req, res) => {
  try {
    const organizationCountResult = await getCountOrganization();
    const count = organizationCountResult[0]["COUNT(*)"];
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/subscriber-count", async (_req, res) => {
  try {
    const subscriberCountResult = await getCountSubscriber();
    const count = subscriberCountResult[0]["COUNT(*)"];
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/total-revenue', async (_req, res) => {
    try {
        const revenue = await getRevenue();
        if (!Array.isArray(revenue)) {
            return res.status(200).json([]);
        }
        res.status(200).json(revenue);
    } catch (error) {
        console.error(error);
        res.status(200).json([]);
    }
});

router.get('/age', async (_req, res) => {
    try {
        const age = await getAge();
        if (!Array.isArray(age)) {
            return res.status(200).json([]);
        }
        res.status(200).json(age);
    } catch (error) {
        console.error(error);
        res.status(200).json([]);
    }
});
router.get('/registered-user', async (_req, res) => {
    try {
        const reg_u = await getRegUser();
        if (!Array.isArray(reg_u)) {
            return res.status(200).json([]);
        }
        res.status(200).json(reg_u);
    } catch (error) {
        console.error(error);
        res.status(200).json([]);
    }
});
router.get('/completed-task', async (_req, res) => {
    try {
        const completed = await getTotalCompletedTask();
        if (!Array.isArray(completed)) {
            return res.status(200).json([]);
        }
        res.status(200).json(completed);
    } catch (error) {
        console.error(error);
        res.status(200).json([]);
    }
});
router.get('/subs-per-month', async (_req, res) => {
    try {
        const completed = await getSubscriberPerMonth();
        if (!Array.isArray(completed)) {
            return res.status(200).json([]);
        }
        res.status(200).json(completed);
    } catch (error) {
        console.error(error);
        res.status(200).json([]);
    }
});
router.get('/gender', async (_req, res) => {
    try {
        const completed = await getGender();
        if (!Array.isArray(completed)) {
            return res.status(200).json([]);
        }
        res.status(200).json(completed);
    } catch (error) {
        console.error(error);
        res.status(200).json([]);
    }
});

router.get('/revenue', async (_req, res) => {
    try {
        const countrevenue = await getTotalRevenue();
        const revenue = countrevenue[0].Revenue; // Access using the alias 'Revenue'
        res.status(200).json({ revenue });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/sub-revenue', async (_req, res) => {
    try {
        const revenueData = await getSubRevenue();
        const revenue = revenueData[0]; // This should contain TodayRevenue, WeekRevenue, and MonthRevenue
        res.status(200).json(revenue);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// This is for the Add Task functionality
/**
 * Adds a new task to the database
 * @param {string} taskName - The name of the task
 * @param {string} taskDescription - A description of the task
 * @param {number} taskPoints - The number of points associated with the task
 * @param {string} taskDifficulty - The difficulty level of the task (easy, normal, hard)
 * @returns {object} - The result of the query
 */
router.post("/task", async (req, res) => {
  const {
    taskDifficulty,
    organizationId,
    taskName,
    taskDescription,
    taskDuration,
    taskPoints,
    Status,
  } = req.body;

  try {
    const result = await addTask(
      taskDifficulty,
      organizationId,
      taskName,
      taskDescription,
      taskDuration,
      taskPoints,
      Status
    );

    if (result.affectedRows === 1) {
      res.status(201).json({ message: "Task added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add task" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// This is for the fetch Task
router.get("/tasks", async (_req, res) => {
  try {
    const taskData = await getTasks();
    res.status(200).json(taskData);
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving tasks data" });
  }
});

//
router.get("/report", async (_req, res) => {
  try {
    const reportData = await getTotalParticipants();
    res.status(200).json(reportData);
  } catch (error) {
    console.error("Server error", error);
    res
      .status(500)
      .json({
        message: "An error occurred while retrieving total participants data",
      });
  }
});

router.get("/participants/:eventId", async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const participantsData = await getParticipants(eventId);

    const eventName = participantsData[0]
      ? participantsData[0].EventName
      : null;

    const response = {
      eventName: eventName,
      participants: participantsData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Server error", error);
    res
      .status(500)
      .json({
        message: "An error occurred while retrieving participants data",
      });
  }
});

router.get("/task-participants/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const taskName = await getTaskNameById(taskId);
    if (!taskName) {
      return res.status(404).json({ message: "Task not found." });
    }

    const participantsData = await getParticipantsForTask(taskId);

    const response = {
      taskName: taskName,
      participants: participantsData || [],
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Server error:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while retrieving participants for the task",
      });
  }
});

router.get("/reward", async (_req, res) => {
  try {
    const rewards = await getRewards();
    res.status(200).json(rewards);
  } catch (error) {
    console.error("Server error", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/rewards", async (req, res) => {
  const {
    productId,
    productName,
    productDescription,
    productSize,
    productQuantity,
    pointsRequired,
  } = req.body;

  try {
    const result = await addProduct(
      productId,
      productName,
      productDescription,
      productSize,
      productQuantity,
      pointsRequired
    );

    if (result.affectedRows === 1) {
      res.status(201).json({ message: "Reward added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add Reward" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/rewards/:id", async (req, res) => {
  const {
    productName,
    productDescription,
    productSize,
    productQuantity,
    pointsRequired,
  } = req.body;
  const { id } = req.params;

  try {
    const result = await editReward(
      id,
      productName,
      productDescription,
      productSize,
      productQuantity,
      pointsRequired
    );

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Reward updated successfully" });
    } else {
      res.status(500).json({ message: "Failed to update Reward" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete("/rewards/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteReward(id);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Reward deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete Reward" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//add organization
router.post("/organization", async (req, res) => {
  const { organizationName, organizationAddress, organizationType } = req.body;
  try {
    const result = await addOrganization(
      organizationName,
      organizationAddress,
      organizationType
    );
    if (result.affectedRows === 1) {
      res.status(201).json({ message: "Organization added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add organization" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/addCoordinator", async (req, res) => {
  const { OrganizationId, Rank, Username, Password } = req.body;

  try {
    const resultPerson = await createPerson(
      null,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
    const PersonId = resultPerson.insertId;

    const resultCoordinator = await addCoordinator(
      OrganizationId,
      Rank,
      PersonId,
      Username,
      Password
    );

    if (resultCoordinator.affectedRows === 1) {
      res.status(201).json({ message: "Coordinator added successfully" });
    } else {
      res.status(500).json({ message: "Failed to add coordinator" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
