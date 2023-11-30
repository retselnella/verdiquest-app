const db = require("../database");

class Image {
  constructor(db) {
    this.db = db; // Assign the 'db' object to the instance variable
  }
  async insertImageOrgProfile(fileName, organizationId) {
    try {
      const [row] = await this.db.query(
        "UPDATE organization SET OrganizationImage = ? WHERE OrganizationId = ?",
        [fileName, organizationId]
      );
      const updateProfileOrg = row.affectedrows;
      return updateProfileOrg;
    } catch (error) {
      console.error(`Error inserting Image Org Profile`, error);
      throw error;
    }
  }

  async insertTaskImage(fileName, taskData) {
    try {
      const [task] = await this.db.query(
        "INSERT INTO dailytask (DifficultyId, OrganizationId, TaskImage, TaskName, TaskDescription, TaskDuration, TaskPoints, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          taskData.difficultyId,
          taskData.organizationId,
          fileName,
          taskData.taskName,
          taskData.taskDescription,
          taskData.taskDuration,
          taskData.taskPoints,
          taskData.Status,
        ]
      );
      const insertedTaskId = task.insertId;
      return insertedTaskId;
    } catch (error) {
      console.error(`Error inserting task`, error);
      throw error;
    }
  }

  async updateTaskImage(fileName, organizationId) {
    try {
      const [row] = await this.db.query(
        "UPDATE dailytask SET TaskImage = ? WHERE TaskId = ?",
        [fileName, organizationId]
      );
      const updateTaskImage = row.affectedrows;
      return updateTaskImage;
    } catch (error) {
      console.error(`Error inserting Image`, error);
      throw error;
    }
  }
}
module.exports = Image;
