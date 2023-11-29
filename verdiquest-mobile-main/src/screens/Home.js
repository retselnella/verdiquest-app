import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, } from "react-native";
import axios from "axios";
import { theme } from "../../assets/style";
import PointCard from "../components/PointCard";
import CardTask from "../components/CardTask";
import ipAddress from "../database/ipAddress";
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

const Home = ({ route}) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const [userPoint, setUserPoints] = useState(0);
  const [tasks, setTasks] = useState([]);
  const localhost = ipAddress;

  const screenHeight = Dimensions.get("window").height;
  const paddingBottom = screenHeight * 0.15;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && user && user.UserId) {
      fetchTasks();
      fetchVerdiPoints();
    }
  }, [isFocused, user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${localhost}/user/fetchAcceptedTasks/${user.UserId}`);
      if (response.data.success) {
        const tasksWithUniqueKeys = response.data.acceptedTasks.map((task) => ({
          ...task,
          key: `task-${task.TaskId}-${Math.random().toString(16).slice(2)}`,
        }));
        setTasks(tasksWithUniqueKeys);
      } else {
        console.log("Failed to fetch accepted tasks");
      }
    } catch (error) {
      console.error("Error fetching accepted tasks:", error);
    }
  };

  const fetchVerdiPoints = async () => {
    try {
        const response = await axios.get(`${localhost}/user/fetchVerdiPoints/${user.UserId}`);
        if (response.data.success) {
            setUserPoints(response.data.verdiPoints);
        } else {
            console.log("Failed to fetch VerdiPoints");
        }
    } catch (error) {
        console.error("Error fetching VerdiPoints:", error);
    }
  };

  const formatPoints = (points) => {
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getDifficultyLevel = (difficultyId) => {
    const difficultyString = String(difficultyId);
    switch (difficultyString) {
      case "0":
        return "All";
      case "1":
        return "Easy";
      case "2":
        return "Normal";
      case "3":
        return "Hard";
      default:
        return "Unknown";
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
      contentContainerStyle={{ paddingBottom: paddingBottom }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 10 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 30,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              marginHorizontal: 20,
            }}
          >
            <View style={styles.profileContainer}></View>
            <PointCard points={formatPoints(userPoint)} />
          </View>
          <View>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text
                style={{ fontSize: 20, color: "white", fontWeight: "bold" }}
              >
                Ongoing Tasks
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 24,
                color: theme.colors.primary,
                fontWeight: "bold",
                marginVertical: 20,
              }}
            >
              Daily Tasks
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "column", margin: 10 }}>
            {tasks.map((task) => (
                <CardTask
                    key={task.key}
                    title={task.TaskName || "No Title"}
                    difficulty={getDifficultyLevel(task.DifficultyId) || "No Difficulty"}
                    description={task.TaskDescription || "No Description"}
                    onPress={() => navigation.navigate('TaskDetails', { taskId: task.TaskId })}
                />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 120,
    width: 120,
  },
  profileContainer: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    backgroundColor: theme.colors.primary,
  },
  buttonStyle: {
    flex: 1,
    marginHorizontal: 30,
    backgroundColor: "#3D691B",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default Home;