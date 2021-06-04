import styled from "styled-components/native";
import { Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  /* width: 90%;
  margin: 5% auto; */
`;

export const HeaderContainer = styled.View`
  /* margin-top: 40 / /%; */
  width: 90%;
  margin: 15% auto 0;
`;

export const GoBackChatButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  z-index: 1;
`;

export const BackIcon = styled(Ionicons)``;

export const RecipientInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const RecipientImage = styled(Animated.Image)`
  width: 55px;
  height: 55px;
  border-radius: ${55 / 2}px;
`;

export const Section = styled(Animated.View)`
  margin-left: 20px;
`;

export const RecipientName = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

export const RecipientStatus = styled.Text`
  color: #c2ffc8;
  font-size: 10px;
`;

export const StatusNotifications = styled(Animated.View)`
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #2a2835;
  margin-top: 20px;
`;

export const SectionNotification = styled.View`
  margin-left: 5%;
`;

export const TextNotification = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

export const Status = styled.Text`
  color: #6d6978;
`;
