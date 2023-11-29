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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const CoordinatorDashboard = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  //Navigate to Register Screen
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
    >
      <View style={styles.background}>
        {/* Profile Picture */}
        <Image
          source={require("../../../assets/img/default-image.png")}
          style={styles.profileImg}
        />
        <Text style={styles.coordinatorLabel}>Coordinator</Text>
        {/* Coordinator's Username */}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Username</Text>
          <TextInput
            style={styles.inputStyle}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter Username"
          />
        </View>
        {/* Coordinator's First Name*/}
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>First Name</Text>
          <TextInput
            style={styles.inputStyle}
            value={firstName}
            onChangeText={setFirstname}
            secureTextEntry={true}
            placeholder="Enter First Name"
          />
        </View>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Middle Initial</Text>
          <TextInput
            style={styles.inputStyle}
            value={middleInitial}
            onChangeText={setMiddleInitial}
            secureTextEntry={true}
            placeholder="Enter Middle Initial"
          />
        </View>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Last Name</Text>
          <TextInput
            style={styles.inputStyle}
            value={lastName}
            onChangeText={setLastName}
            secureTextEntry={true}
            placeholder="Enter Last Name"
          />
        </View>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Address</Text>
          <TextInput
            style={styles.inputStyle}
            value={address}
            onChangeText={setAddress}
            secureTextEntry={true}
            placeholder="Enter Address"
          />
        </View>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 30 }}>
            Remove
          </Text>
        </TouchableOpacity>
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
    marginTop: 150,
    marginBottom: -20,
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
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 80,
    alignSelf: "center",
  },
  coordinatorLabel: {
    fontSize: 18,
    color: "#44483E",
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default CoordinatorDashboard;
