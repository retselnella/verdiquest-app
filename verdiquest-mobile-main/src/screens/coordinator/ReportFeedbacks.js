import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { theme } from "../../../assets/style";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import ipAddress from "../../database/ipAddress";

const ReportFeedbacks = ({ route }) => {
  const { item } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const localhost = ipAddress;

  const [fetchedParticipants, setFetchedParticipants] = useState([]);

  //API BACKEND CALL
  const fetchParticipants = async () => {
    try {
      let eventId = item.EventId;
      if (!eventId) {
        console.error("No event ID available");
        setError("No event ID available"); // Set error message
        setIsLoading(false); // End loading
        return;
      }
      const response = await axios.post(
        `${localhost}/coordinator/fetchParticipantsVerified`,
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

  useEffect(() => {
    fetchParticipants();
  }, [item.EventId || item.eventId]);

  // const renderStars = (rating) => {
  //   let stars = [];
  //   for (let i = 0; i < 5; i++) {
  //     stars.push(
  //       <MaterialIcon
  //         name={i < rating ? "star" : "star-border"}
  //         size={16}
  //         color="#ffd700"
  //         key={i}
  //       />
  //     );
  //   }
  //   return stars;
  // };

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.taskName}>Feedbacks</Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.container}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
          >
            {item.EventName}
          </Text>
          {fetchedParticipants != null && fetchedParticipants.length > 0 ? (
            fetchedParticipants.map((item) => (
              <View key={item.ParticipantId} style={styles.feedbackCard}>
                <View style={styles.userAvatar} />
                <View style={styles.feedbackTextContainer}>
                  <Text style={styles.feedbackText}>"{item.Feedback}"</Text>
                  <Text style={styles.userText}>{item.FirstName}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No user feedbacks yet!
            </Text>
          )}

          <View style={styles.totalRatingContainer}>
            {/* <Text>Total Rating:</Text>
            <Text style={styles.totalRating}>4.3</Text> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingVertical: 20, // Padding for the header
    paddingHorizontal: 16, // Padding for the header
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically
    width: "100%", // Header width
    marginTop: "10%",
  },
  taskName: {
    fontSize: 24, // Adjust the size to match your design
    fontWeight: "bold",
    color: "black", // Adjust the color to match your design
  },
  scrollView: {
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  feedbackCard: {
    backgroundColor: "rgba(123, 144, 75, 0.4)", // Use your theme card background color
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 40,
    borderRadius: 8,
    marginVertical: 15,
    alignItems: "center",
    borderRadius: 16,
  },
  userAvatar: {
    backgroundColor: theme.colors.avatarBackground, // Use your theme avatar background color
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  feedbackTextContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  feedbackText: {
    fontSize: 12, // Adjust as needed
    textAlign: "justify",
    // Use your theme text color
  },
  starRating: {
    flexDirection: "row",
    marginTop: 4,
  },
  userText: {
    fontSize: 12,
    color: theme.colors.subText, // Use your theme subtext color
    marginTop: 4,
    fontWeight: "bold",
  },
  totalRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  totalRating: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.highlight, // Use your theme highlight color
  },
  container: {
    backgroundColor: "rgba(123,144,75,0.4)",
    borderRadius: 20,
    width: "80%",
    paddingTop: 20,
    flex: 1,
  },
  // ... other styles ...
});

export default ReportFeedbacks;
