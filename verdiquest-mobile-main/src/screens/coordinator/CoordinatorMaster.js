import React from "react";
import { StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import CoordinatorCard from "../../components/CoordinatorCard";
import { useNavigation } from "@react-navigation/native";
import defaultImage from "../../../assets/img/default-profile.png";
// import WavyHeader from "../../components/WavyHeader";

const CoordinatorMaster = ({ img }) => {
  const navigation = useNavigation();

  const gotoAddCoordinator = () => {
    navigation.navigate("AddCoordinator");
  };

  return (
    <View style={styles.container}>
      {img ? (
        <View style={{ alignSelf: "flex-end", width: 100 }}>
          <Image
            defaultSource={defaultImage}
            source={img}
            style={styles.profileStyle}
          />
        </View>
      ) : (
        <View style={{ alignSelf: "flex-end", width: 100 }}>
          <Image source={defaultImage} style={styles.profileStyle} />
        </View>
      )}
      <View style={styles.header}>
        <View style={{ flex: 1 }}></View>
        <Text style={styles.textStyle}>Coordinator</Text>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Button title="+ Add" onPress={gotoAddCoordinator} />
        </View>
      </View>
      <View>
        <CoordinatorCard name="Danmar Nacario" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: theme.colors.background,
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  textStyle: {
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileStyle: {
    width: "100%",
    height: 100,
    resizeMode: "center",
  },
});

export default CoordinatorMaster;
