import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import ipAddress from "../database/ipAddress";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const localhost = ipAddress;

  const login = async (email, password, navigation) => {
    setIsLoading(true);
    try {
      console.log(`${localhost}/user/login`);
      const response = await axios.post(`${localhost}/user/login`, {
        email: email,
        password: password,
      });

      const token = response.data.token;
      const user = response.data.user;

      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);

      navigation.navigate("AppTabNav", { user: user });
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Error", "Failed to Login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginCoordinator = async (username, password, navigation) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${localhost}/coordinator/login`, {
        username: username,
        password: password,
      });

      if (response.data.success) {
        const token = response.data.token;
        const coordinator = response.data.coordinator;
        await AsyncStorage.setItem("userToken", token);

        setUserToken(token);

        navigation.navigate("CoordInterface", { coordinator: coordinator });
        Alert.alert("Success", "You successfully logged in!");
      } else {
        Alert.alert("Failed", response.data.message || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        Alert.alert("Login Failed", "Incorrect username or password.");
      } else {
        Alert.alert("Error", "An error occurred during login");
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    // Note: You may also want to invalidate the token on the server side
    await AsyncStorage.removeItem("userToken");
    setUserToken(null);
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token);
    } catch (e) {
      console.log(`isLogged is error ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  // const getProtectedData = async () => {
  //     // Get the JWT token from AsyncStorage
  //     const token = await AsyncStorage.getItem('userToken');

  //     // Make a GET request to the protected endpoint, passing in the JWT token in the Authorization header
  //     const response = await axios.get('http://192.168.1.12:3000/protected', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  // }

  useEffect(() => {
    isLoggedIn();
    // getProtectedData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, loginCoordinator, isLoading, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
