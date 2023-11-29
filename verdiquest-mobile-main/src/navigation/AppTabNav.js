import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Redeem from "../screens/Redeem";
import MyPoints from "../screens/MyPoints";
import TaskStack from "./TaskStack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../assets/style";
import PartnerStack from "./PartnerStack";

const Tab = createBottomTabNavigator();

const AppTabNav = ({ route }) => {
  const { user } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 35,
          elevation: 0,
          backgroundColor: "#F1F1EA",
          borderRadius: 15,
          height: 80,
          padding: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 5,
          overflow: "hidden",
        },
        tabBarActiveTintColor: theme.colors.lightSecondary,
        tabBarInactiveTintColor: "#44483E",
        headerShown: false,
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontWeight: "bold",
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ user: user }}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "home" : "home";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskStack}
        initialParams={{ user: user }}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "list" : "list";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="My Points"
        component={MyPoints}
        initialParams={{ user: user }}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused
              ? "account-balance-wallet"
              : "account-balance-wallet";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Redeem"
        component={Redeem}
        initialParams={{ user: user }}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "wallet-giftcard" : "wallet-giftcard";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Partners"
        component={PartnerStack}
        initialParams={{ user: user }}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? "handshake" : "handshake";
            return (
              <MaterialCommunity name={iconName} size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNav;
