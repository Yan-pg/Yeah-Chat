import styled from "styled-components/native";
import { Animated } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

interface ModalContainerProps {
  width: number;
}

export const ModalContainer = styled(Animated.View)<ModalContainerProps>`
  background-color: #84364d;
  position: absolute;
  width: 100%;
  height: 150px;

  top: 0px;
  left: 0;
  border-radius: 15px;
`;

export const Content = styled.View`
  width: 90%;
  margin: 60px auto;
`;

export const Section = styled.View`
  margin-left: 20px;
`;

export const Icon = styled(Ionicons)``;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

export const Description = styled.Text`
  width: 80%;
  color: #a0a0a0;
`;

export const ButtonClose = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

export const CloseIcon = styled(AntDesign)``;
