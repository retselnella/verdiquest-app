import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Button from "./Button";
import defaultImage from "../../assets/img/default-image.png";
import DeleteButton from "./DeleteButton";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const CoordTaskCard = ({
  title,
  difficulty,
  participants,
  img,
  description,
  onPress,
  eventName,
  done,
  deleteTask,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: img } || defaultImage}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{title}</Text>
        {difficulty ? <Text>{difficulty}</Text> : <Text>{eventName}</Text>}
        <Text style={{ textAlign: "center" }}>{description}</Text>
        <View style={styles.buttonContainer}>
          <View
            style={{
              flexDirection: "column",
              alignSelf: "center",
              gap: -5,
            }}
          >
            <Text style={{ textAlign: "center", padding: 5 }}>
              <MaterialIcon name="people" size={18} />
              {participants}
            </Text>
            <Text style={{ textAlign: "center", padding: 5 }}>
              <MaterialIcon name="done-outline" size={18} />
              {done}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <DeleteButton title={"Delete"} onPress={deleteTask} />
          </View>
          <Button title="View" onPress={onPress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F2FA",
    flexDirection: "row", // Changed to row
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    margin: 20,
    alignItems: "center", // Align items in the center vertically
  },
  imageContainer: {
    // Container for the image
    marginRight: 10, // Add some space between the image and the text
  },
  imageStyle: {
    width: 70, // Adjust as needed
    height: 180,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  textContainer: {
    // Container for the text
    flex: 1, // Take the remaining space
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flex: 1,
    marginLeft: 50,
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
  },
});

export default CoordTaskCard;
