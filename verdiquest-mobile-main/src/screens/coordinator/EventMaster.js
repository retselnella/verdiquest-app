import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import CoordEventCard from "../../components/CoordEventCard";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import ipAddress from "../../database/ipAddress";

const EventMaster = ({ route }) => {
  const navigation = useNavigation();
  const localhost = ipAddress;
  const [isLoading, setIsLoading] = useState(false);

  const [fetchedEvents, setFetchedEvents] = useState([]);
  const { coordinator } = route.params;
  const goCreateEvent = (coordinator, onFetchEvent) => {
    navigation.navigate("CoordinatorAddEvent", {
      coordinator: coordinator,
      onFetchEvent: onFetchEvent,
    });
  };

  const goToView = (coordinator, onFetchEvent, item) => {
    navigation.navigate("ViewEvent", {
      item: item,
      coordinator: coordinator,
      onFetchEvent: onFetchEvent,
    });
  };
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

  // DELETING A TASK
  const deleteEvent = async (eventId) => {
    try {
      const response = await axios.post(
        `${localhost}/coordinator/deleteEvent`,
        {
          eventId: eventId,
        }
      );
      fetchEvent();
    } catch (error) {
      console.error("Error deleting event!", error);
      return [];
    }
  };

  //--------------------------------------------

  useEffect(() => {
    fetchEvent();
  }, [coordinator.OrganizationId]);

  //------------------------------------------------------------
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <Button
            title="+ Create"
            onPress={() => goCreateEvent(coordinator, fetchEvent)}
          />
        </View>
        <Text style={styles.textStyle}>Events</Text>
        <View style={{ flex: 1 }}></View>
      </View>
      <ScrollView style={styles.scrollView}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} /> // Loading indicator)
        ) : fetchedEvents != null && fetchedEvents.length > 0 ? (
          fetchedEvents.map((item) => (
            <CoordEventCard
              key={item.EventId}
              participants={item.participantCount || 0}
              title={item.EventName}
              description={item.EventDescription}
              onPress={() => goToView(coordinator, fetchEvent, item)}
              onDelete={() => deleteEvent(item.EventId)}
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
    textAlign: "justify",
  },
  header: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollView: {
    width: "90%", // Ensures ScrollView takes full width
  },
});

export default EventMaster;
