import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { theme } from "../../assets/style";

const WavyHeader = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Svg
        height="150"
        width="100%"
        viewBox="0 0 1440 320"
        style={styles.svgCurve}
      >
        <Path fill={theme.colors.background} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  svgCurve: {
    position: "absolute",
    width: "100%",
  },
  headerTextContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default WavyHeader;
