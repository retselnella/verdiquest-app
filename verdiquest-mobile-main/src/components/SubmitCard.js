import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { theme } from "../../assets/style";

const SubmitCard = ({
  name,
  status,
  startTime,
  endTime,
  profileImage,
  proofImages,
  onDecline,
  onComplete,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={profileImage} style={styles.profileImage} />
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.status}>{`Status: ${status}`}</Text>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeBlock}>
          <Text style={styles.dateTimeLabel}>Date Time Started:</Text>
          <Text style={styles.dateTimeValue}>{startTime}</Text>
        </View>
        <View style={styles.dateTimeBlock}>
          <Text style={styles.dateTimeLabel}>Date Time Finished:</Text>
          <Text style={styles.dateTimeValue}>{endTime}</Text>
        </View>
      </View>
      <View style={styles.proofSection}>
        <Text style={styles.proofLabel}>Proof Submitted:</Text>
        <View style={styles.proofContainer}>
          {proofImages &&
            proofImages.map((image, index) => (
              <Image key={index} source={image} style={styles.proofImage} />
            ))}
        </View>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={onDecline} style={styles.declineButton}>
          <Text style={styles.actionText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComplete} style={styles.completeButton}>
          <Text style={styles.actionText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 550,
    width: 350,
    backgroundColor: "#DAE7C9",
    borderRadius: 15,
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  profileContainer: {
    height: 110,
    width: 110,
    borderRadius: 110 / 2,
    marginTop: -5,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    marginTop: 10,
  },
  status: {
    fontSize: 16,
    color: theme.colors.text,
    marginVertical: 5,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  dateTimeBlock: {
    alignItems: "center",
  },
  dateTimeLabel: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 5,
  },
  dateTimeValue: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  proofSection: {
    width: "100%",
    marginTop: 10,
    alignItems: "right",
  },
  proofLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 5,
  },
  proofContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },
  proofImage: {
    height: 60,
    width: 60,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 50,
  },
  declineButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  completeButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});

SubmitCard.defaultProps = {
  name: "Lester",
  status: "Active",
  startTime: "hh:mm:ss dd/mm/yy",
  endTime: "hh:mm:ss dd/mm/yy",
  profileImage: require("../../assets/img/default-image.png"),
  proofImages: [
    require("../../assets/img/google.png"),
    require("../../assets/favicon.png"),
    require("../../assets/img/default-image.png"),
  ],
  onDecline: () => {},
  onComplete: () => {},
};

export default SubmitCard;
