import React, { useState, ActivityIndicator } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ipAddress from "../../database/ipAddress";

const MemberView = ({ route }) => {
  const navigation = useNavigation();
  const { member, coordinator } = route.params;
  console.log(member);
  const localhost = ipAddress;
  const [isLoading, setIsLoading] = useState(false);

  //Remove a member!
  const removeMember = async (userId) => {
    try {
      const response = await axios.post(
        `${localhost}/coordinator/removeUserFromOrg`,
        {
          userId: userId,
        }
      );
      navigation.navigate("Organization", { coordinator: coordinator });
    } catch (error) {
      console.error("Error removing the member!", error);
      return [];
    }
  };

  //

  return (
    <View style={styles.background}>
      <View style={styles.eventDetailsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <Image
            source={{
              uri: `${localhost}/img/profilepicture/${member.ProfilePicture}`,
            }}
            style={styles.profileStyle}
          />
        )}
        <View style={{ justifyContent: "flex-start" }}>
          <Text
            style={{ fontSize: 24, textAlign: "center", fontWeight: "bold" }}
          >
            {member.FirstName + member.Initial + member.LastName}
          </Text>
          <Text style={styles.textInput}>Date of Registration</Text>
          <Text style={styles.inputStyle}>{member.DateRegistered}</Text>
          <View>
            <Text style={styles.textInput}>Phone Number</Text>
            <Text style={styles.inputStyle}>{member.PhoneNumber}</Text>
          </View>
          <Text style={styles.textInput}>Task Count</Text>
          <Text style={styles.inputStyle}>{member.TaskCount}</Text>
          <View style={styles.row}>
            <Button
              title={"Delete"}
              color={"#BA1A1A"}
              onPress={() => removeMember(member.UserId)}
            />
          </View>
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

  inputStyle: {
    borderColor: "#44483E",
    borderWidth: 1,
    borderRadius: 12,
    width: 280,
    height: 45,
    marginTop: -5,
    fontWeight: "bold",
    margin: 10,
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
  profileStyle: {
    width: "100%",
    height: 100,
    resizeMode: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default MemberView;
