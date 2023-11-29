import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "../../../assets/style";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import ipAddress from "../../database/ipAddress";

const ViewOrganization = ({ route }) => {
  const localhost = ipAddress;
  const { coordinator } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logo, setLogo] = useState(
    require("../../../assets/img/verdiquestlogo-ver2.png")
  );

  const [editData, setEditData] = useState({
    orgImage: coordinator.OrganizationImage,
    orgName: coordinator.OrganizationName,
    orgAddress: coordinator.OrganizationAddress,
    orgType: coordinator.OrganizationType,
    orgId: coordinator.OrganizationId,
  });

  const updateOrganization = (field, text) => {
    setEditData({ ...editData, [field]: text });
  };

  //Image
  const handleEditPress = async () => {
    // Ask for permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Request Change Denied!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    // If it's not cancelled, use the image uri
    setLogo({ uri: pickerResult.uri });
  };

  const handleEditOrganization = async () => {
    if (isEditing) {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        const response = await axios.post(
          `${localhost}/coordinator/updateOrganization`,
          editData
        );
        console.log(response.data);
      } catch (error) {
        console.log("Error! updating the profile!", error);
      } finally {
        setIsSubmitting(false);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Organization Profile</Text>

      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity onPress={handleEditPress} style={styles.editIcon}>
          <MaterialIcons name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: "flex-start" }}>
        <Text style={styles.textInput}>Organization Name</Text>
        <TextInput
          style={styles.inputStyle}
          value={editData.orgName}
          onChangeText={(text) => updateOrganization("orgName", text)}
          editable={isEditing}
        />
      </View>
      <View style={{ justifyContent: "flex-start" }}>
        <Text style={styles.textInput}>Orgnization Address</Text>
        <TextInput
          style={styles.inputStyle}
          value={editData.orgAddress}
          onChangeText={(text) => updateOrganization("orgAddress", text)}
          editable={isEditing}
        />
      </View>
      <View style={{ justifyContent: "flex-start" }}>
        <Text style={styles.textInput}>Organization Type</Text>
        <TextInput
          style={styles.inputStyle}
          value={editData.orgType}
          onChangeText={(text) => updateOrganization("orgType", text)}
          editable={isEditing}
        />
      </View>

      <TouchableOpacity
        onPress={handleEditOrganization}
        style={styles.editButton}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isEditing ? "Save changes" : "Edit info"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputStyle: {
    borderColor: "#44483E",
    borderWidth: 1,
    borderRadius: 12,
    width: 256,
    height: 45,
    marginTop: -15,
    margin: 10,
    padding: 10,
  },
  textInput: {
    marginLeft: 20,
    backgroundColor: theme.colors.background,
    alignSelf: "flex-start",
    fontSize: 16,
    color: "#44483E",
    zIndex: 1,
    padding: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  editIcon: {
    position: "absolute",
    right: -10,
    bottom: -10,
  },

  editButton: {
    backgroundColor: "#3D691B", // Adjust background color accordingly
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default ViewOrganization;
