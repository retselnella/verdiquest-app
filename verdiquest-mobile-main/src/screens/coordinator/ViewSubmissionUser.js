import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { theme } from "../../../assets/style";
import SubmitCard from "../../components/SubmitCard";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ipAddress from "../../database/ipAddress";

const ViewSubmissionUser = ({ route }) => {
  const screenHeight = Dimensions.get("window").height;
  const localhost = ipAddress;
  const paddingBottom = screenHeight * 0.15;
  const { data, onTaskFetch } = route.params;
  console.log(data);
  console.log(onTaskFetch);

  const navigation = useNavigation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  //COORDINATOR ACCEPT SUBMISSION
  const handleComplete = async (data) => {
    try {
      const response = await axios.post(`${localhost}/user/updateUser`, {
        verdiPoints: data.TaskPoints,
        userId: data.UserId,
      });
      const responseUserTask = await axios.post(
        `${localhost}/coordinator/updateUserTask`,
        {
          Status: "Complete",
          userDailyTaskId: data.UserDailyTaskId,
        }
      );
      onTaskFetch();
      navigation.navigate("ViewSubmission", { taskData: data });
    } catch (error) {
      console.log("Error updating user/task data:", error);
      throw error;
    }
  };

  const handleDecline = async (data) => {
    try {
      const responseUserTask = await axios.post(
        `${localhost}/coordinator/updateUserTask`,
        {
          Status: "Ongoing",
          userDailyTaskId: data.UserDailyTaskId,
        }
      );
      onTaskFetch();
      navigation.navigate("ViewSubmission", { taskData: data });
    } catch (error) {
      console.log("Error updating user/task data:", error);
      throw error;
    }
  };

  ///----------------------------------------------------------------------------
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
      contentContainerStyle={{ paddingBottom: paddingBottom }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 100 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
              marginHorizontal: 20,
            }}
          >
            <Text style={styles.taskLabel}>{data.TaskName}</Text>
            <View style={styles.divider} />
          </View>
        </View>
        <View style={styles.submissionContainer}>
          <SubmitCard
            startTime={formatDate(data.DateTaken)}
            name={data.FirstName}
            status={data.Status}
            endTime={formatDate(data.DateFinished)}
            onComplete={() => handleComplete(data)}
            onDecline={() => handleDecline(data)}
            profileImage={{
              uri: `${localhost}/img/profilepicture/${data.ProfilePicture}`,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  taskContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  taskLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    width: "100%",
    height: 0.75,
    backgroundColor: "#000000",
    marginVertical: 5,
  },
  submissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewSubmissionUser;
