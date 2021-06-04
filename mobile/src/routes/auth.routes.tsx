import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignUp from "../pages/SignUp";
import SignInPage from "../pages/SignIn";

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#252330" },
    }}
  >
    <Auth.Screen name="SignIn" component={SignInPage} />
    <Auth.Screen name="SignUp" component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
