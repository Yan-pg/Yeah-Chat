import styled from "styled-components/native";
import { Animated, FlatList } from "react-native";
import { UsersProps } from "./index";
import { FontAwesome, Entypo } from "@expo/vector-icons";

interface UserCotainerProps {
  lastuser: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  width: 90%;
  margin: 0 auto;
  margin-top: 18%;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const LogoYeah = styled.Image``;

export const GoToProfile = styled.TouchableOpacity``;

export const AvatarHeader = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const UserList = styled(
  Animated.FlatList as new () => FlatList<UsersProps>
)`
  padding: 22px 0px 16px;
`;

export const UserCotainer = styled(Animated.View)<UserCotainerProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => (props.lastuser ? 50 : 20)}px;
`;

export const UserContent = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* width: 50%; */
`;

export const UserAvatar = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: ${45 / 2}px;
`;

export const UserInfo = styled.View`
  margin-left: 14px;
`;

export const UserName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
`;

export const IconPhoto = styled(FontAwesome)``;

export const UserLastMessage = styled.Text`
  color: #6d6978;
`;

export const UserLastTime = styled.Text`
  color: #6d6978;
`;

export const ImageBlur = styled.Image`
  width: 85px;
  height: 85px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 25px;
  right: 0;
`;

export const MoreMessageButton = styled.TouchableOpacity`
  width: 55px;
  height: 55px;
  border-radius: ${55 / 2}px;
  background-color: #b510c6;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 40px;
  right: 13px;
`;

export const IconPlus = styled(Entypo)``;
