import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import CoordTaskCard from "../../components/CoordTaskCard";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ipAddress from "../../database/ipAddress";
import { useIsFocused } from "@react-navigation/native";

const TaskMaster = ({ route }) => {
  const [fetchedTasks, setFetchedTasks] = useState([]);
  const localhost = ipAddress;
  const isFocused = useIsFocused;
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const { coordinator } = route.params;
  //navigate to creation of task
  const goToCreateTask = () => {
    navigation.navigate("CreateTaskDashboard", {
      coordinator: coordinator,
      // onTaskCreated: fetchTasks,
    });
  };

  const countTakers = async (taskId) => {
    try {
      const response = await axios.post(
        `${localhost}/coordinator/fetchCountTakers`,
        {
          taskId: taskId,
        }
      );
      return response.data.count;
    } catch (error) {
      console.error("Error counting Takers", error);
    }
  };

  const taskTakers = async (taskId) => {
    try {
      const response = await axios.post(
        `${localhost}/coordinator/fetchTaskTakers`,
        {
          taskId: taskId,
        }
      );
      return response.data.count;
    } catch (error) {
      console.error("Error counting Takers", error);
    }
  };

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${localhost}/coordinator/fetchTasks?organizationId=${coordinator.OrganizationId}`
      );
      const taskWithCount = await Promise.all(
        (response.data.fetchTable || []).map(async (item) => {
          const takersCount = await countTakers(item.TaskId);
          const takersTask = await taskTakers(item.TaskId);
          return { ...item, takersCount, takersTask };
        })
      );
      setFetchedTasks(taskWithCount);
    } catch (error) {
      console.error("Error fetching task table", error);
      return []; // Return an empty array in case of an error
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.post(`${localhost}/coordinator/deleteTask`, {
        taskId: taskId,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task!", error);
      return [];
    }
  };

  useEffect(() => {
    if (isFocused) fetchTasks();
  }, [isFocused]);

  //navigation for View
  const gotoCard = (taskData, onTaskFetch) => {
    navigation.navigate("TaskView", {
      taskData: taskData,
      onTaskFetch: onTaskFetch,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Button title="+ Create" onPress={() => goToCreateTask()} />
        </View>
        <Text style={styles.textStyle}>Tasks</Text>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={styles.divider}></View>
      <ScrollView style={styles.scrollView}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} /> // Loading indicator
        ) : fetchedTasks != null ? (
          fetchedTasks.map((item) => (
            <CoordTaskCard
              img={`${localhost}/img/task/${item.TaskImage}`}
              key={item.TaskId}
              participants={item.takersTask || 0}
              done={item.takersCount || 0}
              title={item.TaskName}
              description={item.TaskDescription}
              onPress={() => gotoCard(item, fetchTasks)}
              deleteTask={() => deleteTask(item.TaskId)}
            />
          ))
        ) : (
          <Text>No tasks available for this coordinator.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  textStyle: {
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollView: {
    width: "90%", // Ensures ScrollView takes full width
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#161616",
    marginTop: -10,
  },
});

export default TaskMaster;
