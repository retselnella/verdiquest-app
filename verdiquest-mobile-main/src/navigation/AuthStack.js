import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { theme } from "../../assets/style";
import AppTabNav from "./AppTabNav";
import LoginIntro from "../screens/LoginIntro";
import CoordinatorStack from "./CoordinatorStack";
import CoordInterface from "../screens/coordinator/CoordInterface";
import ProductDetails from "../screens/ProductDetails";
import ProductConfirm from "../screens/ProductConfirm";
import ProductRedeem from "../screens/ProductRedeem";
import ProductReceipt from "../screens/ProductReceipt";
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginIntro">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AppTabNav"
          component={AppTabNav}
          options={{
            headerStyle: {
              backgroundColor: theme.colors.lightSecondary,
            },
            headerTintColor: theme.colors.secondary,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerLeft: false,
            headerTitleAlign: "center",
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="LoginIntro"
          component={LoginIntro}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CoordinatorStack"
          component={CoordinatorStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CoordInterface"
          component={CoordInterface}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="ProductDetail"
          component={ProductDetails}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="ProductConfirm"
          component={ProductConfirm}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="ProductRedeem"
          component={ProductRedeem}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="ProductReceipt"
          component={ProductReceipt}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
