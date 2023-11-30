import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { theme } from "../../../assets/style";
import OrganizationMemberCard from "../../components/OrganizationMemberCard";
import { useNavigation } from "@react-navigation/native";
import ipAddress from "../../database/ipAddress";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Button from "../../components/Button";

const Organization = ({ route }) => {
  const { coordinator } = route.params;
  const localhost = ipAddress;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const imageSource = {
    uri: `${localhost}/img/organization/${coordinator.OrganizationImage}`,
  };
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${localhost}/coordinator/getUsersByOrg`,
        {
          orgId: coordinator.OrganizationId,
        }
      );
      setFetchedUsers(response.data.fetchTable);
    } catch (error) {
      console.error("Error fetching task table", error);
      return []; // Return an empty array in case of an error
    } finally {
      setIsLoading(false);
    }
  };

  //for going to member view
  const goToMember = (item) => {
    navigation.navigate("MemberView", {
      member: item,
      coordinator: coordinator,
    });
  };

  // SOFT DELETION OF ORG ------------------------------------
  const deleteOrg = async (orgId) => {
    try {
      const response = await axios.post(`${localhost}/coordinator/deleteOrg`, {
        orgId: orgId,
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting the org!", error);
    }
  };
  //----------------------------------------------------------

  // DELETE PROMPT -------------------------------------------
  const confirmDeletion = (orgId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this organization?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteOrg(orgId),
        },
      ],
      { cancelable: false }
    );
  };

  //----------------------------------------------------------

  useEffect(() => {
    if (isFocused) {
      fetchUsers();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <Image source={imageSource} style={styles.profileStyle} />
        <View style={styles.header}>
          <View style={{ flex: 1 }}></View>
          <Text style={styles.textStyle}>{coordinator.OrganizationName}</Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Button
              title={"Delete"}
              color={"#BA1A1A"}
              onPress={() => confirmDeletion(coordinator.OrganizationId)}
            />
          </View>
        </View>
        <View style={styles.divider}></View>
        <View>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} /> // Loading indicator)
          ) : fetchedUsers != null && fetchedUsers.length > 0 ? (
            <FlatList
              data={fetchedUsers}
              renderItem={({ item }) => (
                <OrganizationMemberCard
                  name={item.FirstName + item.LastName}
                  img={item.ProfilePicture}
                  onPress={() => goToMember(item)}
                />
              )}
              keyExtractor={(item) => item.UserId}
              numColumns={2}
            />
          ) : (
            <Text>No members yet for this organization.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  textStyle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileStyle: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  divider: {
    width: "60%",
    height: 1.5,
    backgroundColor: "#090909",
    marginTop: -10,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
});

export default Organization;
