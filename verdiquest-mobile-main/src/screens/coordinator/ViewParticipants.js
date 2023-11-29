import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ipAddress from "../../database/ipAddress";

const ViewParticipants = ({ route }) => {
  const { eventData } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerify] = useState(false);
  const localhost = ipAddress;

  const [fetchedParticipants, setFetchedParticipants] = useState([]);

  //BACKEND API CALL
  //FETCHING PARTICIPANTS
  const fetchParticipants = async () => {
    try {
      let eventId = eventData.eventId;
      if (!eventId) {
        console.error("No event ID available");
        setError("No event ID available"); // Set error message
        setIsLoading(false); // End loading
        return;
      }
      const response = await axios.post(
        `${localhost}/coordinator/fetchParticipants`,
        {
          eventId,
        }
      );
      setFetchedParticipants(response.data.fetchTable);
      setIsLoading(false); // End loading
    } catch (error) {
      console.error("Error fetching participants table", error);
      setError("Error fetching participants table");
      setIsLoading(false);
    }
  };

  //VERIFICATION OF PARTICIPANTS

  const handleVerify = async (data) => {
    try {
      const response = await axios.post(
        `${localhost}/coordinator/updateParticipant`,
        {
          Status: "VERIFIED",
          participantId: data.ParticipantId,
        }
      );
      const responsePoints = await axios.post(`${localhost}/user/updateUser`, {
        verdiPoints: data.EventPoints,
        userId: data.UserId,
      });
      fetchParticipants();
    } catch (error) {
      console.log("Error updating user/task data:", error);
      throw error;
    }
  };

  //---------------------

  useEffect(() => {
    fetchParticipants();
  }, [eventData.EventId || eventData.eventId]);

  return (
    <View style={styles.background}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.taskName}>
          {eventData.eventName || eventData.EventName}
        </Text>
      </View>
      {isLoading && (
        <Text>Loading...</Text> // Simple loading text, can be replaced with a spinner
      )}
      {/* Content ScrollView */}
      {error ? (
        <Text style={styles.errorMessage}>{error}</Text> // Display error message
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {fetchedParticipants != null ? (
            fetchedParticipants.map((item) => (
              <View key={item.ParticipantId} style={styles.cardContainer}>
                <View style={styles.imagePlaceholder} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>
                    {item.FirstName} {item.LastName}
                  </Text>
                  <Text style={styles.status}>Status: {item.Status}</Text>
                </View>
                <TouchableOpacity
                  style={
                    item.Status == "VERIFIED"
                      ? {
                          backgroundColor: "grey",
                          paddingVertical: 6,
                          paddingHorizontal: 16,
                          borderRadius: 20,
                          justifyContent: "center",
                        }
                      : styles.button
                  }
                  onPress={() => handleVerify(item)}
                  disabled={item.Status == "VERIFIED" ? true : false}
                >
                  <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>No participants yet!</Text>
          )}
        </ScrollView>
      )}
    </View>
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
    paddingVertical: 20, // Padding for the header
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
  errorMessage: {
    color: "red", // Example error message color
    textAlign: "center",
    marginTop: 20,
  },
  // ... other styles if needed
});

export default ViewParticipants;
