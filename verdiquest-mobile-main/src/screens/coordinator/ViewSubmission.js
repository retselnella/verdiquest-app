import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ipAddress from "../../database/ipAddress";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewSubmission = ({ route }) => {
  const { taskData } = route.params;
  const localhost = ipAddress;

  const [fetchedTasks, setFetchedTasks] = useState([]);
  //FOR NAVIGATION
  const navigation = useNavigation();
  const goToViewSubmissionUser = (item, onTaskFetch) => {
    navigation.navigate("ViewSubmissionUser", {
      data: item,
      onTaskFetch: onTaskFetch,
    });
  };
  //----------------------------------------

  const fetchTasks = async () => {
    try {
      let taskId = taskData.taskId || taskData.TaskId; // Use taskId if it exists, otherwise use TaskId
      if (!taskId) {
        console.error("No task ID available");
        return []; // Exit the function if no task ID is provided
      }

      const response = await axios.post(`${localhost}/coordinator/getTasks`, {
        taskId,
      });
      setFetchedTasks(response.data.fetchTable);
    } catch (error) {
      console.error("Error fetching tasks table", error);
      return [];
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [taskData.UserDailyTaskId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.background}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.taskName}>
            {taskData.taskName || taskData.TaskName}
          </Text>
          <View style={styles.divider}></View>
        </View>
        {/* Content ScrollView */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {fetchedTasks != null && fetchedTasks.length > 0 ? (
            fetchedTasks.map((item) => (
              <View key={item.TaskId} style={styles.cardContainer}>
                <View style={styles.imagePlaceholder}>
                  <Image
                    source={{
                      uri: `${localhost}/img/profilepicture/${item.ProfilePicture}`,
                    }}
                    style={styles.imageStyle}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>
                    {item.FirstName} {item.LastName}
                  </Text>
                  <Text style={styles.status}>Status: {item.Status}</Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => goToViewSubmissionUser(item, fetchTasks)}
                >
                  <Text style={styles.buttonText}>View Submission</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No user submissions.</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  taskName: {
    fontSize: 24, // Adjust the size to match your design
    fontWeight: "bold",
    color: "black", // Adjust the color to match your design
  },

  header: {
    backgroundColor: "#f5f5f5", // Header background color
    paddingTop: 10, // Padding for the header
    paddingHorizontal: 16, // Padding for the header
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    width: "100%", // Header width
  },
  logo: {
    width: 50, // Logo width
    height: 50, // Logo height
    resizeMode: "contain", // Keeps the logo's aspect ratio
  },
  scrollView: {
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(123, 144, 75, 0.25)",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    width: "90%",
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#44483E",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e1",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 10,
    top: -10,
    fontWeight: "bold",
    color: "#000",
  },
  status: {
    fontSize: 9,
    left: 10,
    color: "grey",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#161616",
    marginTop: 10,
  },
  imageStyle: {
    height: 50,
    width: 50,
    resizeMode: "cover",
    borderRadius: 50 / 2,
    borderColor: "black",
    borderWidth: 0.5,
  },
  // ... other styles if needed
});

export default ViewSubmission;
