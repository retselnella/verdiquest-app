import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../../assets/style";
import CoordEventCard from "../../components/CoordReportCard";
import { useNavigation } from "@react-navigation/native";
import ipAddress from "../../database/ipAddress";
import axios from "axios";

const ReportEvent = ({ route }) => {
  const navigation = useNavigation();
  const localhost = ipAddress;
  const [isLoading, setIsLoading] = useState(false);

  const [fetchedEvents, setFetchedEvents] = useState([]);
  const { coordinator } = route.params;

  const goToView = (item) => {
    navigation.navigate("ReportFeedbacks", {
      item: item,
    });
  };

  const goToTasks = (coordinator) => {
    navigation.navigate("ReportMission", {
      coordinator: coordinator,
    });
  };

  //API BACKEND CALL
  //Count Number of Participants
  const countParticipants = async (eventId) => {
    try {
      const response = await axios.post(
        `${localhost}/coordinator/fetchCountParticipants`,
        {
          eventId: eventId,
        }
      );
      return response.data.count;
    } catch (error) {
      console.error("Error counting Participants", error);
    }
  };

  //fetching Events
  const fetchEvent = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${localhost}/coordinator/fetchEvents`,
        {
          organizationId: coordinator.OrganizationId,
        }
      );
      const eventWithCount = await Promise.all(
        (response.data.fetchTable || []).map(async (item) => {
          const participantCount = await countParticipants(item.EventId);
          return { ...item, participantCount };
        })
      );
      setFetchedEvents(eventWithCount);
    } catch (error) {
      console.error("Error fetching events table", error);
      return []; // Return an empty array in case of an error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [coordinator.OrganizationId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textStyle}>REPORT</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => goToTasks(coordinator)}
        >
          <Text style={styles.buttonText}>Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, styles.buttonActive]}>
          <Text style={styles.buttonTextActive}>Event</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : fetchedEvents != null && fetchedEvents.length > 0 ? (
          fetchedEvents.map((item) => (
            <CoordEventCard
              key={item.EventId}
              participants={item.participantCount || 0}
              feedback={0}
              title={item.EventName}
              description={item.EventDescription}
              status={item.EventStatus}
              onPress={() => goToView(item)}
            />
          ))
        ) : (
          <Text>No event/s available for this organization.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  textStyle: {
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollView: {
    width: "90%", // Ensures ScrollView takes full width
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20, // Space from the bottom
  },
  buttonStyle: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#3F4A34", // Change as per your inactive button color
  },
  buttonActive: {
    backgroundColor: "#4CAF50", // Change as per your active button color
  },
  buttonText: {
    color: "white", // Change as per your inactive text color
    textAlign: "center",
  },
  buttonTextActive: {
    color: "#FFFFFF", // Change as per your active text color
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  textStyle: {
    fontSize: 16,
    paddingVertical: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  scrollView: {
    width: "90%", // Ensures ScrollView takes full width
  },
});

export default ReportEvent;
