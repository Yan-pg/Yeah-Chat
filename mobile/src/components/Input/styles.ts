import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

export const Container = styled.View`
  height: 50px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

export const Icon = styled(Ionicons)``;

export const ShowPasswordButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 14px;
`;

export const IconContainer = styled.View`
  position: absolute;
  left: 11px;
  top: 8px;
  padding: 5px;
`;

export const ContentInput = styled.View`
  height: 50px;
  background-color: #1e1c27;
  border-radius: 7px;
  color: #a0a0a0;
`;
