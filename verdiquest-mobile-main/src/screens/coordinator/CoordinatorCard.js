import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "../../../assets/style";
import defaultImage from "../../assets/img/default-profile.png";

const CoordinatorCard = ({ name, img }) => {
  return (
    <View style={styles.container}>
      {img ? (
        <Image defaultSource={defaultImage} source={img} style={styles.img} />
      ) : (
        <Image source={defaultImage} style={styles.img} />
      )}
      <Text style={[{ fontWeight: "bold", fontSize: 16 }, styles.textStyle]}>
        {name}
      </Text>
      <Text style={[styles.textStyle, { fontSize: 14 }]}>Coordinator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: "black",
    padding: 10,
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

export default CoordinatorCard;
