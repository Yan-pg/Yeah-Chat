import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { Animated, Dimensions, Image, StatusBar, Switch } from "react-native";
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import api from "../../services/api";

interface RecipientProps {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  lastMessage: string | null;
  lastArchive_url: string | null;
  lastTime: string | null;
  status: String | null;
}

interface RouteParams {
  recipient_id: string;
  avatarRoutes: string;
}

import {
  Container,
  HeaderContainer,
  GoBackChatButton,
  BackIcon,
  RecipientInfo,
  RecipientImage,
  Section,
  RecipientName,
  RecipientStatus,
  StatusNotifications,
  SectionNotification,
  TextNotification,
  Status,
} from "./styles";

const ShowRecipient: React.FC = () => {
  const [recipient, setRecipient] = useState({} as RecipientProps);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const value = new Animated.ValueXY({ x: 1, y: 1 });
  const translateNameX = new Animated.Value(0);
  const translateNameY = new Animated.Value(0);
  const translateNotivicafionViewY = new Animated.Value(0);

  const { params } = useRoute();
  const { recipient_id, avatarRoutes } = params as RouteParams;
  const { goBack } = useNavigation();
  const AVATAR = `https://api-chat-estudo.s3.amazonaws.com/Avatars/Random+Users+(Community)/Unsplash-Avatars_0004s_0002_jessica-felicio-QS9ZX5UnS14-unsplash.png`;
  useEffect(() => {
    api
      .get(`profile/${recipient_id}`)
      .then((response) => {
        setRecipient(response.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const borderRadius = useMemo(() => {
    return new Animated.Value(55 / 2);
  }, []);

  const onHandlerStateChanged = (event: HandlerStateChangeEvent | any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationY } = event.nativeEvent;

      if (translationY >= 100) {
        // Animar o scaleX para o aumento da foto
        Animated.timing(value.x, {
          toValue: 20,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Animar o scaleY para o aumento da foto
        Animated.timing(value.y, {
          toValue: 8,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Tirar o border radius assim que a foto é aumentada
        Animated.timing(borderRadius, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Descolocar o nome para que não fique no meio da foto
        Animated.timing(translateNameX, {
          toValue: -75,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Abaixar o nome assim para que não fique no meio da foto
        Animated.timing(translateNameY, {
          toValue: 180,
          duration: 300,
          useNativeDriver: true,
        }).start();

        Animated.timing(translateNotivicafionViewY, {
          toValue: 170,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      // Retornar todos os coponentes para posição inicial
      if (translationY <= 100) {
        Animated.timing(value.x, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        Animated.timing(value.y, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        Animated.timing(borderRadius, {
          toValue: 55 / 2,
          duration: 300,
          useNativeDriver: true,
        }).start();

        Animated.timing(translateNameX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();

        Animated.timing(translateNameY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();

        Animated.timing(translateNotivicafionViewY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <PanGestureHandler onHandlerStateChange={onHandlerStateChanged}>
        <Container>
          <HeaderContainer>
            <GoBackChatButton onPress={() => goBack()}>
              <BackIcon name="arrow-back-outline" size={24} color="white" />
            </GoBackChatButton>
            <RecipientInfo>
              <RecipientImage
                source={{
                  uri: recipient.avatar_url
                    ? recipient.avatar_url
                    : avatarRoutes,
                }}
                style={{
                  transform: [
                    {
                      scaleY: value.y,
                    },
                    {
                      scaleX: value.y,
                    },
                    {
                      translateX: value.x,
                    },
                  ],
                  borderRadius,
                }}
              />

              <Section
                style={{
                  transform: [
                    {
                      translateX: translateNameX,
                    },
                    {
                      translateY: translateNameY,
                    },
                  ],
                }}
              >
                <RecipientName>{recipient.name}</RecipientName>
                <RecipientStatus>
                  {recipient.status ? recipient.status : "Online"}
                </RecipientStatus>
              </Section>
            </RecipientInfo>
          </HeaderContainer>

          <StatusNotifications
            style={{ transform: [{ translateY: translateNotivicafionViewY }] }}
          >
            <SectionNotification>
              <TextNotification>Notificações</TextNotification>
              <Status>{isEnabled ? "On" : "Off"}</Status>
            </SectionNotification>
            <Switch
              trackColor={{ false: "#767577", true: "#b510c6" }}
              thumbColor={isEnabled ? "#343145" : "#3e3e3e"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{ marginRight: "5%" }}
            />
          </StatusNotifications>
        </Container>
      </PanGestureHandler>
    </>
  );
};

export default ShowRecipient;
