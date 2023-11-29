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
import ipAddress from "../../database/ipAddress";

const CoordinatorAddEvent = ({ route }) => {
  const navigation = useNavigation();
  const localhost = ipAddress;
  const [imageUri, setImageUri] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const { coordinator, onFetchEvent } = route.params;
  const minimumDate = new Date();
  const [eventData, setEventData] = useState({
    organizationId: coordinator.OrganizationId,
    eventName: "",
    eventDescription: "",
    eventVenue: "",
    eventDate: selectedDate,
    eventPoints: "",
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
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate); // Update the selected date
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setSelectedTime(selectedTime); // Update the selected time
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

  //API CALL FOR BACKEND
  const handleCreateEvent = async () => {
    const combinedDateTime = combineDateTime();
    const updatedEventData = {
      ...eventData,
      eventDate: combinedDateTime,
    };
    try {
      const response = await axios.post(
        `${localhost}/coordinator/createEvent`,
        updatedEventData
      );
      onFetchEvent();
      navigation.navigate("EventMaster", { coordinator: coordinator });
    } catch (error) {
      console.log("Error! creating an event", error);
    }
  };
  //-------------------------------------------------------

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
        {/* Event Name */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Event Name</Text>
          <TextInput
            style={styles.inputStyle}
            value={eventData.eventName}
            onChangeText={(text) => updateEventData("eventName", text)}
            placeholder="Enter event's name"
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
          />
        </View>
        <View style={styles.row}>
          {/* Event Date */}
          {/* Date Picker */}
          <View style={styles.column}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
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
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Text>
                Event Start Time: {selectedTime.toLocaleTimeString("en-GB")}
              </Text>
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
            />
          </View>
        </View>
        <Button title="Create" onPress={handleCreateEvent} />
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

export default CoordinatorAddEvent;
