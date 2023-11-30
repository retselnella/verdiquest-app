import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { theme } from "../../assets/style";
import defaultImage from "../../assets/img/default-profile.png";
import ipAddress from "../database/ipAddress";

const OrganizationMemberCard = ({ name, img, onPress }) => {
  const localhost = ipAddress;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        {img ? (
          <Image
            defaultSource={defaultImage}
            source={{ uri: `${localhost}/img/profilepicture/${img}` }}
            style={styles.img}
          />
        ) : (
          <Image source={defaultImage} style={styles.img} />
        )}
        <Text style={[{ fontWeight: "bold", fontSize: 16 }, styles.textStyle]}>
          {name}
        </Text>
        <Text style={[styles.textStyle, { fontSize: 14 }]}>Member</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderWidth: 1.25,
    borderColor: "##090909",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(123,144,75,0.1)",
  },
  img: {
    width: "100%",
    height: 100,
    resizeMode: "center",
    borderRadius: 10,
  },
  textStyle: {
    textAlign: "center",
  },
});

export default OrganizationMemberCard;
