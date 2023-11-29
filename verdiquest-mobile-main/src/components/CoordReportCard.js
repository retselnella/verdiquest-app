import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Button from "./Button";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import defaultImage from "../../assets/img/default-image.png";
import { theme } from "../../assets/style";

const CoordReportCard = ({
  title,
  difficulty,
  participants,
  img,
  description,
  onPress,
  eventName,
  feedback,
  status,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={img || defaultImage} style={styles.imageStyle} />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>{title}</Text>
        {difficulty ? <Text>{difficulty}</Text> : <Text>{eventName}</Text>}
        <Text style={{ textAlign: "center" }}>{description}</Text>

        <View style={styles.buttonContainer}>
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsText}>
              <MaterialIcon name="people" size={20} color={"#56624B"} />
              {participants}
            </Text>
            <Text style={styles.participantsText}>
              <MaterialIcon name="chat" size={20} color={"#56624B"} />
              {feedback}
            </Text>
          </View>
          <View style={styles.listItem}>
            <Button title="View" onPress={onPress} style={styles.button} />

            {/* {status === "ONGOING" && (
              <MaterialIcon
                name="hourglass-bottom"
                size={24}
                color={theme.colors.primary}
              />
            )} */}
            {status === "DONE" && (
              <MaterialIcon
                name="done"
                size={24}
                color={theme.colors.primary}
              />
            )}
            {/* {status === "INCOMING" && (
              <MaterialIcon
                name="lock-clock"
                size={24}
                color={theme.colors.primary}
              />
            )} */}
          </View>
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
    height: 160,
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
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 20,
  },
  participantsContainer: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
  },
  buttonView: {
    flexDirection: "row", // Aligns children in a row
    justifyContent: "flex-start",
    marginLeft: 80,
    gap: 5,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Adjust the color as needed
  },
});

export default CoordReportCard;
