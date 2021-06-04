import React, { useContext, useEffect, useState } from "react";
import { View, Animated } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Input from "../../components/Input";
import { IsLoadingContext } from "../../contexts/isLoading";
import { useAuth } from "../../hooks/Auth";
import api from "../../services/api";
import Logo from "../../../assets/yeah.png";
import Blur from "../../../assets/blur.png";

export interface UsersProps {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  lastMessage: string | null;
  lastArchive_url: string | null;
  lastTime: string | null;
  status: String | null;
}

import {
  Container,
  Content,
  Header,
  LogoYeah,
  GoToProfile,
  AvatarHeader,
  UserList,
  UserCotainer,
  UserContent,
  UserAvatar,
  UserInfo,
  UserName,
  UserLastMessage,
  UserLastTime,
  IconPhoto,
  ImageBlur,
  MoreMessageButton,
  IconPlus,
} from "./styles";

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<UsersProps[]>([]);
  const { user: userLogged } = useAuth();
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const { setLoading } = useContext(IsLoadingContext);
  const [search, setSearch] = useState("");
  const [isLastUser, setIsLastUser] = useState(0);
  const { navigate } = useNavigation();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const ITEM_SIZE = 20 + 16 * 3;
  const AVATAR_SORT = `https://api-chat-estudo.s3.amazonaws.com/Avatars/Unsplash+Avatars+(Community)/Image_0${Math.floor(
    Math.random() * 8 + 1
  )}.png`;

  // useEffect(() => {
  //   AppState.addEventListener("change", _handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener("change", _handleAppStateChange);
  //   };
  // }, []);

  // const _handleAppStateChange = (nextAppState: any) => {
  // if (
  //   appState.current.match(/inactive|background/) &&
  //   nextAppState === "active"
  // ) {
  // }
  // appState.current = nextAppState;
  // setAppStateVisible(appState.current);
  // console.log("AppState", appState.current);
  // };

  useEffect(() => {
    setLoading(false);
    loaderUsers();
  }, []);

  useEffect(() => {
    setIsLastUser(users.length - 1);
  }, [users]);

  const loaderUsers = async () => {
    await api
      .get("users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    if (search.length > 0) {
      const newSearch = users.filter((item) => item.name === search);
      setUsers(newSearch);
    } else {
      loaderUsers();
    }
  };

  const GoToChat = (id: string, name: string, avatar: string) => {
    navigate("Chat", { id, name, avatar });
  };

  return (
    <Container>
      <Content>
        <Header>
          <LogoYeah source={Logo} />
          <GoToProfile
            onPress={() => navigate("Profile", { avatarSort: AVATAR_SORT })}
            activeOpacity={0.5}
          >
            <AvatarHeader
              source={{
                uri: userLogged.avatar
                  ? `https://api-chat-estudo.s3.amazonaws.com/${userLogged.avatar}`
                  : AVATAR_SORT,
              }}
            />
          </GoToProfile>
        </Header>
        <Input
          isShowIcon={true}
          placeholder="Pesquisar"
          icon="search"
          onChangeText={(e) => {
            if (e.length === 0) loaderUsers();
            setSearch(e);
          }}
          returnKeyType="send"
          onSubmitEditing={handleSearch}
        />
        <UserList
          data={users}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(user) => user.id}
          renderItem={({ item: user, index }) => {
            if (user.id === userLogged.id) return null;

            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];

            const opacityInpitRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1),
            ];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });

            const opacity = scrollY.interpolate({
              inputRange: opacityInpitRange,
              outputRange: [1, 1, 0.8, 0],
            });

            if (!user.avatar_url) {
              user.avatar_url = `https://api-chat-estudo.s3.amazonaws.com/Avatars/Unsplash+Avatars+(Community)/Image_0${Math.floor(
                Math.random() * 8 + 1
              )}.png`;
            }

            return (
              <UserCotainer
                style={{ transform: [{ scale }], opacity }}
                lastuser={isLastUser === index}
              >
                <UserContent
                  onPress={() => GoToChat(user.id, user.name, user.avatar_url)}
                >
                  <UserAvatar source={{ uri: user.avatar_url }} />
                  <UserInfo>
                    <UserName>{user.name}</UserName>
                    {!user.lastMessage && user.lastArchive_url ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconPhoto name="photo" color="#6d6978" size={14} />
                        <UserLastMessage style={{ marginLeft: 5 }}>
                          Foto
                        </UserLastMessage>
                      </View>
                    ) : (
                      <UserLastMessage>{user.lastMessage}</UserLastMessage>
                    )}
                  </UserInfo>
                </UserContent>
                <UserLastTime>{user.lastTime}</UserLastTime>
              </UserCotainer>
            );
          }}
        />
      </Content>
      <ImageBlur source={Blur} />

      <MoreMessageButton activeOpacity={0.8}>
        <IconPlus name="plus" size={24} color="white" />
      </MoreMessageButton>
    </Container>
  );
};

export default Dashboard;
