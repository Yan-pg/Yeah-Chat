import styled from "styled-components/native";
import { SimpleLineIcons, Entypo, Feather, Ionicons } from "@expo/vector-icons";

interface SendMensageProps {
  userSening: boolean;
  lastMessageByRecipient?: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 80px;
  margin-top: 14px;
`;

export const HeaderContent = styled.View`
  justify-content: space-between;
  flex-direction: row;
  width: 90%;
  margin: 10% auto;
  align-items: center;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const BackIcon = styled(Ionicons)``;

export const UserInfo = styled.TouchableOpacity`
  flex-direction: row;
`;

export const AvatarHeader = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
  margin-left: 30px;
`;

export const UserName = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
`;

export const UserStatus = styled.Text`
  margin-left: 10px;
  font-size: 12px;
  color: #c2ffc8;
`;

export const OptionsIcon = styled(SimpleLineIcons)``;

export const ContainerChat = styled.View`
  background-color: #252330;
  flex: 1;
  width: 90%;
  margin: 0 auto;
  padding: 10px 0px 16px;
  z-index: 100;
`;

export const ContentMessage = styled.View<SendMensageProps>`
  flex: 1;
  align-items: ${(props) => (props.userSening ? "flex-end" : "flex-start")};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RecipitentAvatar = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

export const SendMensage = styled.View<SendMensageProps>`
  background-color: ${(props) => (props.userSening ? "#b510c6" : "#343145")};
  margin-left: ${(props) => (props.lastMessageByRecipient ? 10 : 30)}px;
  max-width: 70%;
  height: auto;
  padding: 9px 9px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

export const SendText = styled.Text`
  color: white;
  font-weight: bold;
  align-self: flex-start;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: #1e1c27;
  border-radius: 10px;
`;

export const Input = styled.TextInput`
  height: 90%;
  width: 50%;
  font-size: 15px;
  color: #beb7d1;
  margin-left: 13px;
`;

export const PaperclipButton = styled.TouchableOpacity`
  margin-left: 20%;
`;

export const PaperclipIcon = styled(Feather)``;

export const EmojiButton = styled.TouchableOpacity`
  margin-right: 13px;
`;

export const EmojiIcon = styled(Entypo)``;

export const SendButton = styled.TouchableOpacity``;

export const SendButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #b510c6;
  margin-right: 20px;
`;

export const TypingText = styled.Text`
  color: #beb7d1;
`;
