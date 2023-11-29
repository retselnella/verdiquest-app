import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import ipAddress from "../../database/ipAddress";

const CoordInterface = ({ route }) => {
  const [coordinator, setCoordinator] = useState(route.params.coordinator);
  const isFocused = useIsFocused(); // Determines if the screen is focused
  const localhost = ipAddress;
  const navigation = useNavigation();

  const fetchCoordinatorData = async () => {
    try {
      // Replace with your API call to fetch coordinator data
      const response = await axios.post(
        `${localhost}/coordinator/fetchCoordinator`,
        {
          coordinatorId: coordinator.CoordinatorId,
        }
      );
      setCoordinator(response.data.fetchedUser);
    } catch (error) {
      console.log("Error fetching coordinator data:", error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      fetchCoordinatorData();
    }
  }, [isFocused]);

  const gotoTasks = () => {
    navigation.navigate("TaskMaster", { coordinator: coordinator });
  };
  const gotoEvents = () => {
    navigation.navigate("EventMaster", { coordinator: coordinator });
  };
  const gotoReports = () => {
    navigation.navigate("ReportEvent", { coordinator: coordinator });
  };

  const gotoCoordinators = () => {
    navigation.navigate("CoordinatorMaster", {});
  };
  const editCoordinator = () => {
    navigation.navigate("EditProfileCoordinator", { coordinator: coordinator });
  };
  const goToOrganizationProfile = () => {
    navigation.navigate("ViewOrganization", { coordinator: coordinator });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
    >
      <View style={styles.container}>
        {/* Profile Header Section */}
        <View style={styles.profileHeader}>
          <View style={{ alignSelf: "flex-end" }}>
            <TouchableOpacity onPress={goToOrganizationProfile}>
              <Image
                source={require("../../../assets/img/default-image.png")}
                style={styles.profileAvatar}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/img/default-profile.png")}
              style={styles.coordinatorAvatar}
            />
            <View style={styles.userNameWithIcon}>
              <Text
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {coordinator.FirstName} {coordinator.LastName}
              </Text>
              <TouchableOpacity onPress={editCoordinator}>
                <Icon name="pencil" size={20} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.role}>Coordinator</Text>
          </View>
        </View>

        {/* Ongoing Events Section */}
        <View style={styles.ongoingEventsContainer}>
          <Text style={styles.ongoingEventsTitle}>Ongoing Events</Text>
          {/* Insert other components representing the event details here */}
        </View>

        <View style={styles.row}>
          <View style={styles.leftButton}>
            <Button title="Tasks" onPress={gotoTasks} />
          </View>
          <View style={styles.rightButton}>
            <Button title="Coordinators" onPress={gotoCoordinators} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.leftButton}>
            <Button title="Events" onPress={gotoEvents} />
          </View>
          <View style={styles.rightButton}>
            <Button title="Report" onPress={gotoReports} />
          </View>
        </View>
        <View style={styles.logoutButtonContainer}>
          <Button title="Logout" onPress={gotoTasks} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "flex-start",
    padding: 10,
    marginTop: 75,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    flex: 1,
    marginHorizontal: 50,
  },
  leftButton: {
    flex: 1,
    marginRight: 5,
  },
  rightButton: {
    flex: 1,
    marginLeft: 5,
  },
  logoutButtonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  subtextCoordinator: {
    textAlign: "center",
    color: "#000000",
  },
  mainTextCoordinator: {
    textAlign: "center",
    color: "#000000",
  },
  scrollView: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  userNameWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flexShrink: 1,
    marginRight: 8,
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  coordinatorAvatar: {
    width: 90,
    height: 90,
  },

  role: {
    fontSize: 16,
    color: "#000",
  },
  ongoingEventsContainer: {
    height: 200, // Set your desired height
    backgroundColor: "#D9EAD3",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  ongoingEventsTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
  },
});

export default CoordInterface;
