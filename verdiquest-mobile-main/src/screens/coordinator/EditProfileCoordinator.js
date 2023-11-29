import React, { useEffect, useState } from "react";
import { View, TextInput, Image, StyleSheet, Text } from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import ipAddress from "../../database/ipAddress";
import axios from "axios";

const EditProfileCoordinator = ({ route }) => {
  const { coordinator } = route.params;
  const localhost = ipAddress;
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinatorData, setCoordinatorData] = useState({
    userName: coordinator.Username,
    newPassword: "",
    confirmNewPassword: "",
    firstName: coordinator.FirstName,
    middleInitial: coordinator.Initial,
    lastName: coordinator.LastName,
    personId: coordinator.PersonId,
    coordinatorId: coordinator.CoordinatorId,
  });
  const [passwordErrors, setPasswordErrors] = useState({
    newPasswordError: "",
    confirmNewPasswordError: "",
  });

  const validatePasswords = () => {
    let isValid = true;
    let newErrors = { newPasswordError: "", confirmNewPasswordError: "" };

    // Only validate if newPassword and confirmNewPassword are not empty
    if (coordinatorData.newPassword || coordinatorData.confirmNewPassword) {
      if (coordinatorData.newPassword.length < 8) {
        newErrors.newPasswordError =
          "Password must be at least 8 characters long";
        isValid = false;
      }

      if (coordinatorData.newPassword !== coordinatorData.confirmNewPassword) {
        newErrors.confirmNewPasswordError = "Passwords do not match";
        isValid = false;
      }
    }

    setPasswordErrors(newErrors);
    return isValid;
  };

  const handleEditProfile = async () => {
    if (isEditing) {
      if (coordinatorData.newPassword && !validatePasswords()) return;
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          `${localhost}/coordinator/updateCoordinator`,
          coordinatorData
        );
      } catch (error) {
        console.log("Error! updating the profile!", error);
      } finally {
        setIsSubmitting(false);
      }
    }
    setIsEditing(!isEditing);
  };

  const updateCoordinator = (field, text) => {
    setCoordinatorData({ ...coordinatorData, [field]: text });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Icon name="gear" size={22} color={theme.colors.primary} />
          <Text style={styles.textProfile}>Edit Profile</Text>
        </View>
        <Image
          source={require("../../../assets/img/default-profile.png")}
          style={styles.imageProfile}
        />
        <View>
          <Text style={styles.textStyle}>Username</Text>
          <TextInput
            style={styles.textInputStyle}
            value={coordinatorData.userName}
            onChangeText={(text) => updateCoordinator("userName", text)}
            editable={isEditing}
          />
        </View>
        <View>
          <Text style={styles.textStyle}>New Password</Text>
          <TextInput
            style={styles.textInputStyle}
            value={coordinatorData.newPassword}
            secureTextEntry={true}
            onChangeText={(text) => updateCoordinator("newPassword", text)}
            placeholder="New password"
            editable={isEditing}
          />
          {!!passwordErrors.newPasswordError && (
            <Text style={styles.errorText}>
              {passwordErrors.newPasswordError}
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.textStyle}>Confirm New Password</Text>
          <TextInput
            style={styles.textInputStyle}
            value={coordinatorData.confirmNewPassword}
            onChangeText={(text) =>
              updateCoordinator("confirmNewPassword", text)
            }
            secureTextEntry={true}
            placeholder="Confirm new password"
            editable={isEditing}
          />
          {!!passwordErrors.confirmNewPasswordError && (
            <Text style={styles.errorText}>
              {passwordErrors.confirmNewPasswordError}
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.textStyle}>First Name</Text>
          <TextInput
            style={styles.textInputStyle}
            value={coordinatorData.firstName}
            onChangeText={(text) => updateCoordinator("firstName", text)}
            editable={isEditing}
          />
        </View>
        <View>
          <Text style={styles.textStyle}>Middle Initial</Text>
          <TextInput
            style={styles.textInputStyle}
            value={coordinatorData.middleInitial}
            onChangeText={(text) => updateCoordinator("middleInitial", text)}
            editable={isEditing}
          />
        </View>
        <View>
          <Text style={styles.textStyle}>Last Name</Text>
          <TextInput
            style={styles.textInputStyle}
            value={coordinatorData.lastName}
            onChangeText={(text) => updateCoordinator("lastName", text)}
            editable={isEditing}
          />
        </View>
        <Button
          title={isEditing ? "Save Changes" : "Edit"}
          onPress={handleEditProfile}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "15%",
    gap: 15,
  },
  textProfile: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageProfile: {
    height: 100,
    width: 100,
  },
  textInputStyle: {
    zIndex: -1,
    width: 300,
    borderColor: "#44483E",
    borderBottomWidth: 2,
    backgroundColor: "#F1F1EA",
    height: 45,
    marginTop: -15,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  textStyle: {
    marginLeft: 15,
    paddingTop: 10,
    fontSize: 12,
    color: "#44483E",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
  },
});

export default EditProfileCoordinator;
