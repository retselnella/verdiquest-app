const User = require("../models/user");
const db = require("../database");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "5bh(76Hn7B5<pdz";
const bcrypt = require("bcrypt");

const user = new User(db);

async function registerUser(request, response) {
    try {
      const {
        firstName,
        middleInitial,
        lastName,
        gender,
        birthDate,
        phoneNumber,
        street,
        barangay,
        city,
        province,
        email,
        password,
      } = request.body;

      // Hash the password before storing it in the database
      const hashedPassword = bcrypt.hashSync(password, 10);

      const userData = {
        firstName,
        middleInitial,
        lastName,
        gender,
        birthDate,
        phoneNumber,
        street,
        barangay,
        city,
        province,
        email,
        password: hashedPassword,
      };

      const insertedUserId = await user.insertUser(userData);

      // Generate a JWT for the registered user
      const tokenPayload = { id: insertedUserId, email };
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

async function loginUser(request, response) {
    try {
      const { email, password } = request.body;
      console.log(password);
      // Validate request data
      if (!email || !password) {
        return response
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const userData = { email };
      const fetchedUser = await user.fetchUser(userData);

      if (fetchedUser) {
        const isMatch = await bcrypt.compare(password, fetchedUser.Password);

        if (isMatch) {
          // Generate a JWT with an expiration
          const tokenPayload = {
            id: fetchedUser.id,
            email: fetchedUser.email,
          };

          const token = jwt.sign(tokenPayload, SECRET_KEY, {
            expiresIn: "1h", // Set the token to expire in 1 hour
          });

          response.json({
            success: true,
            user: fetchedUser,
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

async function userAllTasks(request, response) {
    try {
      const fetchedTable = await user.fetchTasks();
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



async function userEasyTasks(request, response) {
    try {
      const fetchedTable = await user.fetchEasyTask();
      return response.json({
        success: true,
        fetchedTable: fetchedTable,
      });
    }catch (error) {
      console.error(error);
      response
        .status(500)
        .send({ message: "Server error", error: error.message });
    };
}

async function userNormalTasks(request, response) {
    try {
      const fetchedTable = await user.fetchNormalTask();
      return response.json({
        success: true,
        fetchedTable: fetchedTable,
      });
    }catch (error) {
      console.error(error);
      response
        .status(500)
        .send({ message: "Server error", error: error.message });
    };
}

async function userHardTasks(request, response) {
    try {
      const fetchedTable = await user.fetchHardTask();
      return response.json({
        success: true,
        fetchedTable: fetchedTable,
      });
    }catch (error) {
      console.error(error);
      response
        .status(500)
        .send({ message: "Server error", error: error.message });
    };
}

async function updateUser(request, response) {
    try {
      const { verdiPoints, password, userId } = request.body;

      const userData = {
        verdiPoints,
        password,
        userId,
      };

      const result = await user.updateUser(userData);
      return response.json({
        message: "User updated successfully!",
        success: true,
        result: result,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ success: false, message: "Server error" });
    }
}

async function updateUser(request, response) {
    try {
      const { verdiPoints, password, userId } = request.body;

      const userData = {
        verdiPoints,
        password,
        userId,
      };

      const result = await user.updateUser(userData);
      return response.json({
        message: "User updated successfully!",
        success: true,
        result: result,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ success: false, message: "Server error" });
    }
}

async function fetchTaskDetails(request, response) {
    try {
        const taskId = request.params.taskId;
        const taskDetails = await user.fetchTaskDetails(taskId);
        response.json({ success: true, taskDetails });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Server error", error: error.message });
    }
}

async function userAllDifficultyTasks(request, response) {
    try {
        const fetchedTable = await user.fetchAllDifficultyTasks(); 
        response.json({
            success: true,
            fetchedTable: fetchedTable,
        });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Server error", error: error.message });
    }
}


async function acceptTask(request, response) {
  const { userId, taskId } = request.body; 

  // Check if userId and taskId are provided
  if (!userId || !taskId) {
      response.status(400).send({ success: false, message: 'UserId and TaskId must be provided' });
      return;
  }

  try {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const acceptResult = await user.acceptTask(userId, taskId, currentDate);
    
    if (acceptResult.alreadyAccepted) {
        response.status(409).send({ success: false, message: 'Task is already accepted.' });
        return;
    }

    if (acceptResult.result.affectedRows > 0) {
        response.json({ success: true, message: 'Task accepted successfully.' });
    } else {
        response.status(404).send({ success: false, message: 'Task not found.' });
    }
  } catch (error) {
      console.error(`Error accepting task: ${error}`);
      response.status(500).send({ success: false, message: 'Server error' });
  }
}

async function checkTaskAccepted(request, response) {
  const { userId, taskId } = request.params;
  try {
      const isAccepted = await user.checkTaskAccepted(userId, taskId);
      response.json({ success: true, isAccepted });
  } catch (error) {
      console.error(`Error checking task acceptance: ${error}`);
      response.status(500).send({ success: false, message: 'Server error' });
  }
}

async function fetchAcceptedTasks(request, response) {
  const userId = request.params.userId;
  try {
      const acceptedTasks = await user.fetchAcceptedTasks(userId);
      response.json({ success: true, acceptedTasks });
  } catch (error) {
      console.error(`Error fetching accepted tasks: ${error}`);
      response.status(500).send({ message: "Server error", error: error.message });
  }
}

async function fetchVerdiPoints(request, response) {
  try {
      const userId = request.params.userId;
      const points = await user.getVerdiPoints(userId);
      response.json({ success: true, verdiPoints: points });
  } catch (error) {
      response.status(500).json({ success: false, message: "Error fetching VerdiPoints", error: error.message });
  }
};


async function cancelTask(request, response) {
  try {
    const { userId, taskId } = request.body; 
      const removeFromUserDailyTaskResult = await user.removeFromUserDailyTask(userId, taskId);

      if(!removeFromUserDailyTaskResult.taskRemoved){
          return response.status(400).json({ 
            success: false, 
            message: removeFromUserDailyTaskResult.error 
        });
      }
      response.json({ success: true, message: 'Task cancelled successfully' });
  } catch (error) {
      response.status(500).send(error);
  }
}

async function fetchOrganizations(request, response){
  try{
    const organizations = await user.fetchAllOrganizations();
    response.json({
      success: true,
      organizations: organizations,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Error fetching organizations", error: error.message });
  }

}

async function fetchOrganizationDetails(request, response) {
  const organizationId = request.params.organizationId;
  try {
    const organizationDetails = await user.getOrganizationDetails(organizationId);
    if (organizationDetails) {
        response.json({ success: true, organization: organizationDetails });
    } else {
        response.status(404).send('Organization not found');
    }
  } catch (error) {
      response.status(500).send('Error fetching organization details: ' + error.message);
  }
}

async function joinOrganization(request, response) {
  const userId = request.body.userId;
  const organizationId = request.body.organizationId;

  try {
      await user.updateUserOrganization(userId, organizationId);
      response.json({ success: true, message: 'Successfully joined organization' });
  } catch (error) {
      response.status(500).send('Error joining organization: ' + error.message);
  }
}

async function checkMembership(request, response) {
  const userId = request.query.userId;
  const organizationId = request.query.organizationId;

  try {
      const isMember = await user.isMember(userId, organizationId);
      response.json({ success: true, isMember });
  } catch (error) {
      response.status(500).send('Error checking membership: ' + error.message);
  }
}

async function fetchTasksByOrganization(request, response) {
  const organizationId = request.params.organizationId;

  try {
      const tasks = await user.getTasksByOrganization(organizationId);
      response.json({ success: true, tasks });
  } catch (error) {
      response.status(500).send('Error fetching tasks: ' + error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  userAllTasks,
  userEasyTasks,
  userNormalTasks,
  userHardTasks,
  fetchTaskDetails,
  userAllDifficultyTasks,
  acceptTask,
  fetchAcceptedTasks,
  checkTaskAccepted,
  fetchVerdiPoints,
  cancelTask,
  fetchOrganizations,
  fetchOrganizationDetails,
  joinOrganization,
  checkMembership,
  fetchTasksByOrganization,
};
