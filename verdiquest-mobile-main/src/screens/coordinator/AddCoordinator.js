import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import Button from "../../components/Button";
import { TextInput } from "react-native-gesture-handler";
import { theme } from "../../../assets/style";

const AddCoordinator = () => {
  const [coordinator, setCoordinator] = useState("");

  const handleAddCoordinatorPress = () => {
    if (coordinator === "") {
      Alert.alert("Error", "Please enter a coordinator name");
      return;
    }

    setCoordinator("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View>
          <Text style={styles.titleText}>Assign a Coordinator</Text>
        </View>
        <TextInput
          style={styles.input}
          value={coordinator}
          onChangeText={(text) => setCoordinator(text)}
          placeholder="Add a coordinator"
        />
        <View>
          <Text style={styles.subText}>
            Please insure that the coordinator has {"\n"} already created an
            account.
          </Text>
        </View>
        <Button title="+ Add Coordinator" onPress={handleAddCoordinatorPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    padding: 10,
  },
  background: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    width: "70%",
    height: 50,
    margin: 10,
    marginVertical: 10,
    padding: 10,
    borderWidth: 1.5,
    borderColor: "green",
    borderRadius: 10,
  },
});

export default AddCoordinator;
