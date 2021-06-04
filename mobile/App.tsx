import "react-native-gesture-handler";

import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AppProvider from "./src/hooks";
import { IsErrorProvider } from "./src/contexts/IsError";
import { IsLoadingProvider } from "./src/contexts/isLoading";

import Routes from "./src/routes";

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#252330" translucent />
    <AppProvider>
      <IsErrorProvider>
        <IsLoadingProvider>
          <View style={{ flex: 1, backgroundColor: "#252330" }}>
            <Routes />
          </View>
        </IsLoadingProvider>
      </IsErrorProvider>
    </AppProvider>
  </NavigationContainer>
);

export default App;
