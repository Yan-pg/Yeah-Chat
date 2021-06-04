import styled from "styled-components/native";
import { Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const Container = styled(Animated.View)`
  position: absolute;
  bottom: -100px;
  right: 45px;
`;

export const CameraContainer = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #ec407a;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

export const IconCamera = styled(FontAwesome)``;

export const GalleryContainer = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #bf59cf;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

export const IconGallery = styled(FontAwesome)``;
