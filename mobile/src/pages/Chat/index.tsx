import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { View, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import socketIo from "socket.io-client";
import { useAuth } from "../../hooks/Auth";
import api from "../../services/api";
import { IsLoadingContext } from "../../contexts/isLoading";

interface RouteParams {
  id: string;
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  conversation_id: string;
  message: string;
  imageMessage_url: string;
  recipient_id: string;
  sending_id: string;
  created_at: string;
  updated_at: string;
}

interface isTypingResponse {
  user_id: string;
  isType: boolean;
}

interface onSubmit {
  message?: string | null;
  imageMessage?: string | null;
}

import {
  Container,
  Header,
  HeaderContent,
  SectionHeader,
  BackButton,
  BackIcon,
  UserInfo,
  AvatarHeader,
  UserName,
  UserStatus,
  OptionsIcon,
  ContainerChat,
  ContentMessage,
  Section,
  RecipitentAvatar,
  SendMensage,
  SendText,
  InputContainer,
  Input,
  PaperclipButton,
  PaperclipIcon,
  EmojiButton,
  EmojiIcon,
  SendButton,
  SendButtonText,
  TypingText,
} from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import Files from "../../components/Files";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Post[]>([]);
  const [send, setsend] = useState(false);
  const [getPost, setGetPost] = useState("");
  const [cleanText, setCleanText] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [isTyping, setIsTyping] = useState<isTypingResponse | null>(null);
  const { params } = useRoute();
  const recipient = params as RouteParams;
  const { setLoading } = useContext(IsLoadingContext);
  const { user: userLogged } = useAuth();
  const { navigate, goBack } = useNavigation();
  let SrollViewRef: any = null;

  useEffect(() => {
    setLoading(false);
    loadMessages();
    const socket = socketIo("http://192.168.1.41:3333", {
      transports: ["websocket"],
    });

    socket.on("create-post", (updatePost: Post) => {
      setMessages((prevState) => [...prevState, updatePost]);
    });
  }, []);

  const loadMessages = useCallback(async () => {
    await api
      .get(`posts/${recipient.id}`)
      .then((response) => {
        setMessages(response.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmitMessage = useCallback(async () => {
    setCleanText(true);
    await api.post("posts", {
      message: getPost,
      recipient_id: recipient.id,
    });
    setCleanText(false);
  }, [getPost]);

  const getLastMessageByRecipient = useCallback(() => {
    const messageByRecipient = messages.map(
      (element, index, arrayMessage): any => {
        if (
          element.sending_id !== userLogged.id &&
          arrayMessage[index + 1]?.sending_id === userLogged.id
        ) {
          return index;
        }
      }
    );
    return messageByRecipient;
  }, [messages]);

  const goToRecipientInfo = () => {
    navigate("ShowRecipient", {
      recipient_id: recipient.id,
      avatarRoutes: recipient.avatar,
    });
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <SectionHeader>
            <BackButton onPress={goBack}>
              <BackIcon name="arrow-back-outline" size={22} color="white" />
            </BackButton>
            <UserInfo onPress={goToRecipientInfo}>
              <AvatarHeader source={{ uri: recipient.avatar }} />
              <View>
                <UserName>{recipient.name}</UserName>
                <UserStatus>online</UserStatus>
              </View>
            </UserInfo>
          </SectionHeader>
          <OptionsIcon name="options-vertical" size={20} color="#6D6978" />
        </HeaderContent>
      </Header>

      <ContainerChat>
        <ScrollView
          ref={(ref) => (SrollViewRef = ref)}
          onContentSizeChange={() =>
            SrollViewRef.scrollToEnd({ animated: true })
          }
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, index) => {
            if (message.created_at.indexOf(":0") !== -1)
              message.created_at = message.created_at.replace(":0", ":00");

            return (
              <ContentMessage
                key={`${message.id + index}`}
                userSening={message.sending_id === userLogged.id}
              >
                <Section style={{ flexDirection: "row" }}>
                  {getLastMessageByRecipient().includes(index) && (
                    <RecipitentAvatar source={{ uri: recipient.avatar }} />
                  )}
                  <SendMensage
                    userSening={message.sending_id === userLogged.id}
                    lastMessageByRecipient={getLastMessageByRecipient().includes(
                      index
                    )}
                  >
                    {message.message ? (
                      <SendText>{message.message}</SendText>
                    ) : (
                      <Image
                        style={{ width: 40, height: 40 }}
                        source={{ uri: message.imageMessage_url }}
                      />
                    )}
                  </SendMensage>
                </Section>
              </ContentMessage>
            );
          })}
          {isTyping?.isType && isTyping?.user_id !== userLogged.id && (
            <TypingText>Digitando...</TypingText>
          )}
        </ScrollView>
        <InputContainer>
          <Input
            placeholder="Digite uma mensagem..."
            placeholderTextColor="#6D6978"
            onChangeText={(text) => {
              setGetPost(text);
              text !== "" ? setsend(true) : setsend(false);
            }}
            value={cleanText ? "" : undefined}
            multiline
          />
          {!send ? (
            <>
              <PaperclipButton onPress={() => setShowFiles(!showFiles)}>
                <PaperclipIcon name="paperclip" size={24} color="#6D6978" />
              </PaperclipButton>
              <EmojiButton>
                <EmojiIcon name="emoji-happy" size={24} color="#beb7d1" />
              </EmojiButton>
            </>
          ) : (
            <SendButton onPress={onSubmitMessage}>
              <SendButtonText>Enviar</SendButtonText>
            </SendButton>
          )}
        </InputContainer>
        {showFiles && <Files recipient_id={recipient.id} />}
      </ContainerChat>
    </Container>
  );
};

export default Chat;
