import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { theme } from "../../../assets/style";
import RegisterFormCoordinator from "../../components/RegisterFormCoordinator";
import Button from "../../components/Button";

const CoordinatorRegistration = () => {
  const logoGoogle = require("../../../assets/img/google.png");

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
    >
      <View style={styles.background}>
        <Text
          style={{
            margin: 20,
            fontSize: 24,
            fontWeight: "bold",
            color: theme.colors.primary,
          }}
        >
          Coordinator Registration
        </Text>
        <Button title="Signup with Google" img={logoGoogle} />
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={{ top: 8 }}>or</Text>
          <View style={styles.divider} />
        </View>
        <RegisterFormCoordinator />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.background,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 50,
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
});

export default CoordinatorRegistration;
