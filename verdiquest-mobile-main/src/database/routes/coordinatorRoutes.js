const express = require("express");
const coordinatorController = require("../controllers/coordinatorController");

const router = express.Router();

router.post(
  "/register/organization",
  coordinatorController.registerOrganization
);
router.post("/register", coordinatorController.registerCoordinator);
router.post("/login", coordinatorController.loginCoordinator);
router.post("/createTask", coordinatorController.createTask);
router.get("/fetchDifficulty", coordinatorController.getDifficulty);
router.get("/fetchTasks", coordinatorController.getTasks);
router.post("/deleteTask", coordinatorController.deleteTask);
router.post("/updateTask", coordinatorController.updateTask);
router.post("/getTasks", coordinatorController.getUserTask);
router.post("/updateUserTask", coordinatorController.updateUserTask);
router.post("/createEvent", coordinatorController.createEvent);
router.post("/fetchEvents", coordinatorController.getEvents);
router.post("/updateEvent", coordinatorController.updateEvent);
router.post("/deleteEvent", coordinatorController.deleteEvent);
router.post("/fetchParticipants", coordinatorController.getParticipants);
router.post(
  "/fetchParticipantsVerified",
  coordinatorController.getParticipantsVerified
);
router.post("/updateParticipant", coordinatorController.updateParticipant);
router.post(
  "/fetchCountParticipants",
  coordinatorController.getCountParticipants
);
router.post("/fetchCountTakers", coordinatorController.getCountTakers);
router.post("/fetchTaskTakers", coordinatorController.getUserCountTakers);
router.post("/updateCoordinator", coordinatorController.updateCoordinator);
router.post("/fetchCoordinator", coordinatorController.fetchCoordinator);
router.post("/updateOrganization", coordinatorController.updateOrganization);

module.exports = router;
