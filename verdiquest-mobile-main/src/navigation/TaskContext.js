import React, { createContext } from "react";
import axios from "axios";
import ipAddress from "../database/ipAddress";

// Create the context
export const TaskContext = createContext();

// Provider Component
export const TaskProvider = ({ children }) => {
  const localhost = ipAddress;
  const submitTask = async (
    taskData,
    navigation,
    coordinator,
    onTaskCreated
  ) => {
    try {
      console.log(taskData);
      console.log(coordinator);
      const response = await axios.post(
        `${localhost}/coordinator/createTask`,
        taskData
      );
      if (response.data.success) {
        console.log("Task added!", response.data);
        // Handle success (maybe clear form or show a success message)
        if (onTaskCreated) {
          onTaskCreated();
        }
        navigation.navigate("TaskMaster", { coordinator: coordinator });
      }
    } catch (error) {
      console.error("Error adding task:", error);
      // Handle error (show error message)
      console.log(error.response.data);
    }
  };

  const fetchDifficulty = async () => {
    try {
      const response = await axios.get(
        `${localhost}/coordinator/fetchDifficulty`
      );
      return Array.isArray(response.data.fetchTable)
        ? response.data.fetchTable
        : [];
    } catch (error) {
      console.error("Error fetching difficulty table", error);
      return []; // Return an empty array in case of an error
    }
  };

  return (
    <TaskContext.Provider value={{ submitTask, fetchDifficulty }}>
      {children}
    </TaskContext.Provider>
  );
};
