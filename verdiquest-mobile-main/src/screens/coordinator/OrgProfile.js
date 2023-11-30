import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import ipAddress from "../../database/ipAddress";

const OrgProfile = () => {
  const [imageUri, setImageUri] = useState(null);
  const localhost = ipAddress;

  const [coordinatorData, setCoordinatorData] = useState({
    organizationName: "",
    organizationAddress: "",
    organizationType: "",
  });
  const navigation = useNavigation();

  const handleInputChange = (name, text) => {
    setCoordinatorData((prev) => ({ ...prev, [name]: text }));
  };

  const handleSubmit = async () => {
    // Check if all the required fields are filled
    const { organizationName, organizationAddress, organizationType } =
      coordinatorData;
    if (!organizationName || !organizationAddress || !organizationType) {
      Alert.alert("Error", "Please fill out all the fields.");
      return;
    }
    axios
      .post(`${localhost}/coordinator/register/organization`, coordinatorData)
      .then((response) => {
        Alert.alert("Success", response.data.message);
        navigation.navigate("CoordinatorRegistration");
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to register. Please try again.");
      });
  };

  // Function to handle the image picking process
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

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
    >
      <View style={styles.background}>
        {/* Touchable Image placeholder */}
        <TouchableOpacity onPress={pickImage} style={styles.imagePlaceholder}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.img} />
          ) : (
            <Text style={styles.imagePlaceholderText}>Select Image</Text>
          )}
        </TouchableOpacity>

        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Organization Name</Text>
          <TextInput
            style={styles.inputStyle}
            value={coordinatorData.organizationName}
            onChangeText={(text) => handleInputChange("organizationName", text)}
          />
        </View>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Organization Address</Text>
          <TextInput
            style={styles.inputStyle}
            value={coordinatorData.organizationAddress}
            onChangeText={(text) =>
              handleInputChange("organizationAddress", text)
            }
          />
        </View>
        <View style={{ justifyContent: "flex-start", marginBottom: 20 }}>
          <Text style={styles.textInput}>Organization Type</Text>
          <TextInput
            style={styles.inputStyle}
            value={coordinatorData.organizationType}
            onChangeText={(text) => handleInputChange("organizationType", text)}
          />
        </View>
        <Button title="CREATE" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  img: {
    width: 180,
    height: 180,
    marginTop: 20,
    borderRadius: 90, // Make the image round
  },
  imagePlaceholder: {
    width: 180,
    height: 180,
    marginTop: 150,
    marginBottom: 50,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e1e1",
  },
  imagePlaceholderText: {
    textAlign: "center",
    color: "#999",
  },
  divider: {
    width: "30%",
    height: 1,
    backgroundColor: "#000000",
    margin: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignContent: "center",
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
});

export default OrgProfile;
