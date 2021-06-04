import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../pages/Dashboard";
import Chat from "../pages/Chat";
import Camera from "../components/Camera";
import ImagePickerExample from "../components/ImagePicker";
import ShowRecipient from "../pages/ShowRecipent";
import Profile from "../pages/Profile";

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: "#252330" },
    }}
  >
    <Auth.Screen name="Dashboard" component={Dashboard} />
    <Auth.Screen name="Chat" component={Chat} />
    <Auth.Screen name="ShowRecipient" component={ShowRecipient} />
    <Auth.Screen name="Profile" component={Profile} />
    <Auth.Screen name="Camera" component={Camera} />
    <Auth.Screen name="Image" component={ImagePickerExample} />
  </Auth.Navigator>
);

export default AppRoutes;
