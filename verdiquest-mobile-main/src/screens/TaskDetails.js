import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, Modal, TouchableOpacity, Alert, } from "react-native";
import Details from "../components/Details";
import Button from "../components/Button";
import defaultImage from "../../assets/img/default-image.png";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ipAddress from "../database/ipAddress";

const TaskDetails = ({ route }) => {
    const navigation = useNavigation();
    const [isAccepted, setIsAccepted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [taskDetails, setTaskDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = route.params;
    const localhost = ipAddress;

    useEffect(() => {
        async function fetchDetailsAndCheckAcceptance() {
        const taskId = route.params.taskId;
        const userId = user.UserId;
            try {
                const detailsResponse = await axios.get(`${localhost}/user/fetchTaskDetails/${taskId}`);

                if (detailsResponse.data.success) {
                    setTaskDetails(detailsResponse.data.taskDetails);
                } else {
                    console.log("Task not found");
                }

                const acceptanceResponse = await axios.get(`${localhost}/user/checkTaskAccepted/${userId}/${taskId}`);
                setIsAccepted(acceptanceResponse.data.isAccepted);
            } catch (error) {
                console.error("Error fetching task details or checking acceptance:",error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDetailsAndCheckAcceptance();
    }, [route.params.taskId, user.UserId]);

    const onPressAccept = async () => {
        if (!user?.UserId || !taskDetails?.TaskId) {
            console.log("User ID or Task ID is missing");
            return;
        }

        try {
            const response = await axios.post(`${localhost}/user/acceptTask`, {
                userId: user.UserId,
                taskId: taskDetails.TaskId,
            });

            if (response.data.success) {
                setIsAccepted(true);
                setShowModal(true);
            } else {
                setErrorMessage("Task is already accepted.");
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error("Error accepting task:", error);
            setErrorMessage("Error accepting task.");
            setShowErrorModal(true);
        }
    };

    const onPressOngoingTask = () => {
        navigation.navigate("MyPoints", { user: user });
    };

    const onPressCancelTask = async () => {
        if (!user?.UserId || !taskDetails?.TaskId) {
            console.log("User ID or Task ID is missing");
            return;
        }
        try {
            const response = await axios.post(`${localhost}/user/cancelTask`, {
                userId: user.UserId,
                taskId: taskDetails.TaskId,
            });

            if (response.data.success) {
                setIsAccepted(false);
                Alert.alert('Success', 'Task cancelled successfully');
            } else {
                Alert.alert("Error", "Failed to cancel the task");
            }
        } catch (error) {
            console.error("Error cancelling task:", error);
            Alert.alert("Error", "An error occurred while cancelling the task");
        }
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image
            source={
                taskDetails.ImageUrl ? { uri: taskDetails.ImageUrl } : defaultImage
            }
            style={styles.imageStyle}
            />
        </View>
        <Text style={styles.textStyle}>{taskDetails.TaskName}</Text>
        <Details
            timeCompleted={taskDetails.TaskDuration || "N/A"}
            taskDescription={
            taskDetails.TaskDescription || "No description available."
            }
            rewardPoints={taskDetails.TaskPoints || 0}
        />
        <View style={{ alignSelf: "center", flexDirection: "row" }}>
            {isAccepted ? (
            <>
                <Button title="Ongoing" onPress={onPressOngoingTask} />
                <Button title="Cancel" onPress={onPressCancelTask} />
            </>
            ) : (
            <Button title="ACCEPT" onPress={onPressAccept} />
            )}
        </View>
        <Modal
            transparent={true}
            visible={showModal}
            onRequestClose={() => setShowModal(false)}
        >
            <TouchableOpacity
            style={styles.modalStyle}
            onPress={() => setShowModal(false)}
            >
            <View style={styles.modalInnerStyle}>
                <Text style={styles.textStyle}>Mission Accepted!</Text>
            </View>
            </TouchableOpacity>
        </Modal>
        <Modal
            transparent={true}
            visible={showErrorModal}
            onRequestClose={() => setShowErrorModal(false)}
        >
            <TouchableOpacity
            style={styles.modalStyle}
            onPress={() => setShowErrorModal(false)}
            >
            <View style={styles.modalInnerStyle}>
                <Text style={styles.textStyle}>{errorMessage}</Text>
            </View>
            </TouchableOpacity>
        </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  imageStyle: {
    width: "100%",
    height: 250,
    resizeMode: "center",
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 1,
  },
  imageContainer: {
    margin: 20,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28,
  },
  modalStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalInnerStyle: {
    backgroundColor: "#7b904b",
    padding: 50,
    borderRadius: 10,
  },
});

export default TaskDetails;
