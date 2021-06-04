import styled from "styled-components/native";
import { Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

interface ContainerProps {
  left: number;
}

export const Container = styled(Animated.View)<ContainerProps>`
  flex: 1;
  width: 200px;
  height: 60px;
  background-color: #13121c;
  border-radius: 10px;
  position: absolute;
  bottom: 5%;
  left: ${(props) => props.left}px;
  justify-content: center;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Icon = styled(FontAwesome)``;
export const IconHome = styled(Foundation)``;
export const MessagePlusIcon = styled(MaterialCommunityIcons)``;
