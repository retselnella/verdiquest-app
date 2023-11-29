import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { theme } from "../../../assets/style"; // Make sure you import your theme correctly
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

const UpdateTaskDashboard = () => {
  const [imageUri, setImageUri] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskType, setTaskType] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDuration, setTaskDuration] = useState("");
  const [taskPoints, setTaskPoints] = useState("");
  const [isEditingPoints, setIsEditingPoints] = useState(false);
  const [isEditingTaskName, setIsEditingTaskName] = useState(false);
  const [isEditingTaskType, setIsEditingTaskType] = useState(false);
  const [isEditingTaskDesc, setIsEditingTaskDesc] = useState(false);
  const [isEditingDuration, setIsEditingDuration] = useState(false);

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

    if (!result.cancelled && result.assets) {
      setImageUri(result.assets[0].uri);
    }
  };
  const handleEditTaskName = () => {
    setIsEditingTaskName(true);
  };
  const handleEditTaskType = () => {
    setIsEditingTaskType(true);
  };
  const handleEditTaskDesc = () => {
    setIsEditingTaskDesc(true);
  };
  const handleEditDuration = () => {
    setIsEditingDuration(true);
  };

  const handleEditPoints = () => {
    setIsEditingPoints(true);
  };

  return (
    <View style={styles.background}>
      <View style={styles.eventDetailsContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.img} />
          ) : (
            <Text style={styles.imagePlaceholderText}>Select Image</Text>
          )}
        </TouchableOpacity>
        {/* Task Name */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Task Name</Text>
          <TextInput
            style={[
              styles.inputStyle,
              isEditingTaskName ? {} : styles.inputDisabled,
            ]}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Enter task name"
            editable={isEditingTaskName}
          />
          <TouchableOpacity
            onPress={handleEditTaskName}
            style={styles.pencilIconTask}
          >
            <FontAwesome name="pencil" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {/* Task Type */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Task Type</Text>
          <TextInput
            style={[
              styles.inputStyle,
              isEditingTaskType ? {} : styles.inputDisabled,
            ]}
            value={taskType}
            onChangeText={setTaskType}
            placeholder="Enter task type"
            editable={isEditingTaskType}
          />
          <TouchableOpacity
            onPress={handleEditTaskType}
            style={styles.pencilIconTask}
          >
            <FontAwesome name="pencil" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {/* Task Description */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Task Description</Text>
          <TextInput
            style={[
              styles.modifiedDescriptioninputStyle,
              isEditingTaskDesc ? {} : styles.inputDisabled,
            ]}
            value={taskDescription}
            onChangeText={setTaskDescription}
            placeholder="Enter task description"
            editable={isEditingTaskDesc}
          />
          <TouchableOpacity
            onPress={handleEditTaskDesc}
            style={styles.pencilIconTask}
          >
            <FontAwesome name="pencil" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {/* Task Duration */}
          <View style={styles.column}>
            <Text style={styles.modifiedTextInput}>Task Duration</Text>
            <TextInput
              style={[
                styles.modifiedInputStyle,
                isEditingDuration ? {} : styles.inputDisabled,
              ]} // Add conditional styling
              value={taskDuration}
              onChangeText={setTaskDuration}
              placeholder="Task Duration"
              editable={isEditingDuration}
            />
            <TouchableOpacity
              onPress={handleEditDuration}
              style={styles.pencilIcon}
            >
              <FontAwesome name="pencil" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {/* Points Reward */}
          <View style={styles.column}>
            <Text style={styles.modifiedTextInput}>Points Reward</Text>
            <TextInput
              style={[
                styles.modifiedInputStyle,
                isEditingPoints ? {} : styles.inputDisabled,
              ]} // Add conditional styling
              value={taskPoints}
              onChangeText={setTaskPoints}
              placeholder="Points Reward"
              editable={isEditingPoints} // Make TextInput editable based on state
            />
            <TouchableOpacity
              onPress={handleEditPoints}
              style={styles.pencilIcon}
            >
              <FontAwesome name="pencil" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <Button title="Update" />
      </View>
    </View>
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
    backgroundColor: "rgba(123, 144, 75, 0.25)",
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
  pencilIconTask: {
    position: "absolute",
    top: 2,
    right: 20,
    height: "100%",
    justifyContent: "center",
  },
  pencilIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    height: "100%",
    justifyContent: "center",
  },

  inputDisabled: {
    color: "grey",
  },
});

export default UpdateTaskDashboard;
