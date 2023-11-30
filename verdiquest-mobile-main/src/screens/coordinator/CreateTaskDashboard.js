import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { TaskProvider, TaskContext } from "../../navigation/TaskContext";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import ipAddress from "../../database/ipAddress";

const CreateDashboardComponent = ({ coordinator, onTaskCreated }) => {
  const { fetchDifficulty } = useContext(TaskContext);
  const navigation = useNavigation();
  const imageSource = {
    uri: `${localhost}/img/task/${coordinator.TaskImage}`,
  };
  const localhost = ipAddress;

  const [selectedDifficulty, setSelectedDifficulty] = useState(1);
  const [taskDurationHours, setTaskDurationHours] = useState("");
  const [difficultyData, setDifficultyData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taskCover, setTaskCover] = useState(imageSource);

  const [taskData, setTaskData] = useState({
    organizationId: coordinator.OrganizationId,
    difficultyId: selectedDifficulty,
    taskName: "",
    taskDescription: "",
    taskDuration: "".toString(),
    taskPoints: "",
    Status: "Active",
  });

  const updateTaskData = (field, value) => {
    setTaskData({ ...taskData, [field]: value });
  };
  useEffect(() => {
    const durationInHours = parseInt(taskDurationHours) || 0;
    updateTaskData("taskDuration", durationInHours);
  }, [taskDurationHours]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "You need to allow access to your photos to upload an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setTaskCover({ uri: result.uri });
    }
  };

  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("filePath", "/images/task");
    for (const key in taskData) {
      if (taskData.hasOwnProperty(key)) {
        formData.append(key, taskData[key]);
      }
    }
    formData.append("image", {
      uri: taskCover.uri,
      type: "image/jpeg",
      name: "upload.jpg",
    });

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${localhost}/coordinator/upload/insertTask`,
        formData
      );

      const result = await response.data;
      navigation.navigate("TaskMaster", { coordinator: coordinator });
    } catch (error) {
      console.error("Error during image upload: ", error.message);
      return null;
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDifficulty();
      setDifficultyData(data);
    };
    loadData();
  }, [fetchDifficulty]); // Dependency array

  useEffect(() => {
    updateTaskData("difficultyId", selectedDifficulty);
  }, [selectedDifficulty]);

  // Handle submit-----------------------------------------

  // const handleSubmit = async () => {
  //   if (isSubmitting) return; // Prevents multiple submissions

  //   setIsSubmitting(true); // Disable the button

  //   try {
  //     uploadImage();
  //     // Handle successful submission
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsSubmitting(false); // Re-enable the button
  //   }
  // };
  //----------------------------------------------------------
  return (
    <View style={styles.background}>
      <View style={styles.eventDetailsContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
          {taskCover ? (
            <Image source={taskCover} style={styles.img} />
          ) : (
            <Text style={styles.imagePlaceholderText}>Select Image</Text>
          )}
        </TouchableOpacity>

        {/* Task Name */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Task Name</Text>
          <TextInput
            style={styles.inputStyle}
            value={taskData.taskName}
            onChangeText={(text) => updateTaskData("taskName", text)}
            placeholder="Enter task name"
          />
        </View>

        {/* Task Description */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Task Description</Text>
          <TextInput
            style={styles.inputStyle}
            value={taskData.taskDescription}
            onChangeText={(text) => updateTaskData("taskDescription", text)}
            placeholder="Enter task description"
          />
        </View>

        {/* Task Duration and Task Points */}
        <View style={styles.row}>
          {/* Task Duration */}
          <View style={styles.column}>
            <Text style={styles.modifiedTextInput}>Task Duration</Text>
            <TextInput
              style={styles.modifiedInputStyle}
              value={taskData.taskDuration.toString()}
              onChangeText={(text) => updateTaskData("taskDuration", text)}
              placeholder="in Hours"
              keyboardType="numeric"
            />
          </View>

          {/* Task Points */}
          <View style={styles.column}>
            <Text style={styles.modifiedTextInput}>Points Reward</Text>
            <TextInput
              style={styles.modifiedInputStyle}
              value={taskData.taskPoints}
              onChangeText={(text) => updateTaskData("taskPoints", text)}
              placeholder="Points Reward"
            />
          </View>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDifficulty}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDifficulty(itemValue)
            }
            style={styles.pickerStyle}
            mode="dropdown"
            dropdownIconColor={"#A7A6A6"}
            dropdownIconRippleColor={theme.colors.background}
          >
            {difficultyData.map((item) => (
              <Picker.Item
                key={item.DifficultyId}
                label={item.Level}
                value={item.DifficultyId}
              />
            ))}
          </Picker>
        </View>

        <Button
          title={isSubmitting ? "Creating..." : "Create"}
          onPress={uploadImage}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
};

const CreateTaskDashboard = ({ route }) => {
  const { coordinator, onTaskCreated } = route.params;
  return (
    <TaskProvider>
      <CreateDashboardComponent
        coordinator={coordinator}
        onTaskCreated={onTaskCreated}
      />
    </TaskProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  eventDetailsContainer: {
    backgroundColor: "rgba(123, 144, 75, 0.25);",
    padding: 30,
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 15,
    marginBottom: 15,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#44483E",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e1",
    marginTop: 15,
    marginBottom: 15,
  },
  imagePlaceholderText: {
    textAlign: "center",
    color: "#999",
  },

  inputStyle: {
    borderColor: "#44483E",
    borderWidth: 1,
    borderRadius: 12,
    width: 280,
    height: 45,
    marginTop: -15,
    margin: 10,
    padding: 10,
  },
  modifiedDescriptioninputStyle: {
    borderColor: "#44483E",
    borderWidth: 1,
    borderRadius: 12,
    width: 280,
    height: 100,
    marginTop: -15,
    margin: 5,
    padding: 10,
  },
  modifiedInputStyle: {
    borderColor: "#44483E",
    borderWidth: 1,
    borderRadius: 12,
    width: 140,
    height: 45,
    marginTop: -15,
    margin: 5,
    padding: 10,
  },
  textInput: {
    marginLeft: 20,
    backgroundColor: theme.colors.background,
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#44483E",
    zIndex: 1,
    padding: 5,
  },

  modifiedTextInput: {
    marginLeft: 10,
    backgroundColor: theme.colors.background,
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#44483E",
    zIndex: 1,
    padding: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  column: {
    flex: 1,
    alignItems: "center",
    padding: 5,
  },
  pickerContainer: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
  },
  pickerStyle: {
    height: 20,
    width: 150,
  },
});

export default CreateTaskDashboard;
