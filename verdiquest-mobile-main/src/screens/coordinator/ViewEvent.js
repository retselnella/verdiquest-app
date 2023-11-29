import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import ipAddress from "../../database/ipAddress";

const ViewEvent = ({ route }) => {
  const { coordinator, onFetchEvent, item } = route.params;
  const navigation = useNavigation();
  const dateOfEvent = new Date(item.EventDate);
  const [imageUri, setImageUri] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateOfEvent);
  const [selectedTime, setSelectedTime] = useState(dateOfEvent);
  const localhost = ipAddress;

  const [isEditing, setIsEditing] = useState(false);

  const minimumDate = new Date();
  const [eventData, setEventData] = useState({
    eventName: item.EventName,
    eventDescription: item.EventDescription,
    eventVenue: item.EventVenue,
    eventPoints: item.EventPoints.toString(),
    eventDate: dateOfEvent,
    eventId: item.EventId,
  });

  const updateEventData = (field, value) => {
    setEventData({ ...eventData, [field]: value });
  };

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
      setImageUri(result.assets[0].uri);
    }
  };

  //DateTimePicker
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeChange = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };

  const combineDateTime = () => {
    const date = selectedDate.toISOString().split("T")[0];
    const time =
      selectedTime.getHours().toString().padStart(2, "0") +
      ":" +
      selectedTime.getMinutes().toString().padStart(2, "0") +
      ":" +
      selectedTime.getSeconds().toString().padStart(2, "0");

    return `${date}T${time}`;
  };

  //------------------

  const goToViewParticipants = () => {
    navigation.navigate("ViewParticipants", {
      eventData: eventData,
    });
  };

  //API CALL FOR BACKEND

  const handleEditSave = async () => {
    if (isEditing) {
      const combinedDateTime = combineDateTime();
      const updatedEventData = {
        ...eventData,
        eventDate: combinedDateTime,
      };
      try {
        const response = await axios.post(
          `${localhost}/coordinator/updateEvent`,
          updatedEventData
        );
        onFetchEvent;
        console.log("Update response:", response.data);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  //-------------------------------------------------------

  return (
    <View style={styles.background}>
      <View style={styles.eventDetailsContainer}>
        <View style={styles.row}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.img} />
            ) : (
              <Text style={styles.imagePlaceholderText}>Select Image</Text>
            )}
          </TouchableOpacity>
        </View>
        {/* Event Name */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Event Name</Text>
          <TextInput
            style={styles.inputStyle}
            value={eventData.eventName}
            onChangeText={(text) => updateEventData("eventName", text)}
            placeholder="Enter event's name"
            editable={isEditing}
          />
        </View>
        {/* Event Description */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Event Description</Text>
          <TextInput
            style={styles.inputStyle}
            value={eventData.eventDescription}
            onChangeText={(text) => updateEventData("eventDescription", text)}
            placeholder="Enter event's description"
            editable={isEditing}
          />
        </View>
        {/* Event Venue */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Event Venue</Text>
          <TextInput
            style={styles.inputStyle}
            value={eventData.eventVenue}
            onChangeText={(text) => updateEventData("eventVenue", text)}
            placeholder="Enter event's event"
            editable={isEditing}
          />
        </View>
        <View style={styles.row}>
          {/* Event Date */}
          {/* Date Picker */}
          <View style={styles.column}>
            <TouchableOpacity
              disabled={isEditing ? false : true}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>Event Date: {selectedDate.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                minimumDate={minimumDate}
                onChange={handleDateChange}
              />
            )}
          </View>
          {/* Time Picker */}
          <View style={styles.column}>
            <TouchableOpacity
              disabled={isEditing ? false : true}
              onPress={() => setShowTimePicker(true)}
            >
              <Text>Event Start Time: {selectedTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>
        </View>
        <View style={styles.row}>
          {/* Event Points */}
          <View style={styles.column}>
            <Text
              style={{
                marginLeft: 80,
                backgroundColor: theme.colors.background,
                alignSelf: "flex-start",
                fontSize: 14,
                color: "#44483E",
                zIndex: 1,
                padding: 5,
              }}
            >
              Points Reward
            </Text>
            <TextInput
              style={styles.modifiedInputStyle}
              value={eventData.eventPoints}
              onChangeText={(text) => updateEventData("eventPoints", text)}
              placeholder="Points Reward"
              keyboardType="numeric"
              editable={isEditing}
            />
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => goToViewParticipants(onFetchEvent)}>
            <View
              style={{
                marginRight: 50,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons
                name="people-alt"
                size={28}
                color={theme.colors.primary}
              />
              <Text style={{ fontWeight: "bold", color: theme.colors.primary }}>
                View Participants
              </Text>
            </View>
          </TouchableOpacity>
          <Button
            title={isEditing ? "Save" : "Edit"}
            onPress={handleEditSave}
          />
        </View>
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
  modifiedParticipantInputStyle: {
    borderColor: "#44483E",
    borderWidth: 1,
    borderRadius: 12,
    width: 180,
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

  modifiedParticipantTextInput: {
    marginLeft: 12,
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
});

export default ViewEvent;
