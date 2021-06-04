import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RectButton } from "react-native-gesture-handler";

export const InactiveButton = styled(RectButton)`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: #939393;
`;

export const ButtonContainer = styled(RectButton)`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
`;

export const Container = styled(LinearGradient)`
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;
