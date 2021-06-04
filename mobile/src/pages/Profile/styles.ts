import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export const Container = styled.View``;

export const HeaderLinear = styled(LinearGradient)`
  width: 100%;
  height: 150px;
  border-bottom-right-radius: 100px;
`;

export const Content = styled.View`
  width: 90%;
  margin: 0 auto;
`;

export const AvatarUserLogged = styled.Image`
  width: 80px;
  height: 80px;
  align-self: center;
  border-radius: 50px;
  margin-top: -12%;
`;

export const BackButton = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
`;

export const BackIcon = styled(Ionicons)``;
export const ContainerButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  margin-top: 60px;
`;

export const SignOutButton = styled.TouchableOpacity``;

export const SignOutIcon = styled(Ionicons)``;

export const EditProfilleContainer = styled.View``;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const InputContainer = styled.View`
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  color: #a0a0a0;
  margin-bottom: 10px;
`;
