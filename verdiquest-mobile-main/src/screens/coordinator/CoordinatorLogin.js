import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../../assets/style";
import Button from "../../components/Button";
import logoGoogle from "../../../assets/img/google.png";
import { AuthContext } from "../../navigation/AuthContext";
import { useNavigation } from "@react-navigation/native";

const CoordinatorLogin = () => {
  const { loginCoordinator } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("OrgProfile");
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: theme.colors.background, flex: 1 }}
    >
      <View style={styles.background}>
        <Image
          source={require("../../../assets/img/verdiquestlogo-ver2.png")}
          style={styles.img}
        />
        <Button title="Login with Google" img={logoGoogle} />
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={{ top: 8 }}>or</Text>
          <View style={styles.divider} />
        </View>
        {/* Username */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: theme.colors.primary,
            marginVertical: 20,
          }}
        >
          Coordinator Login
        </Text>
        <View style={{ justifyContent: "flex-start" }}>
          <Text style={styles.textInput}>Username</Text>
          <TextInput
            style={styles.inputStyle}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        {/* Password */}
        <View style={{ justifyContent: "flex-start", marginBottom: 20 }}>
          <Text style={styles.textInput}>Password</Text>
          <TextInput
            style={styles.inputStyle}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity style={{ alignSelf: "flex-end" }}>
            <Text style={{ fontWeight: "bold", fontSize: 12, marginRight: 20 }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="LOGIN"
          onPress={() => {
            loginCoordinator(username, password, navigation);
          }}
        />
        <TouchableOpacity onPress={handleRegister}>
          <Text style={{ fontWeight: "bold", fontSize: 14, marginTop: 50 }}>
            Create a new account
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
    marginTop: 50,
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
});

export default CoordinatorLogin;
