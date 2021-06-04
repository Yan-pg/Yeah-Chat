import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/Auth";
import api from "../../services/api";

interface RouteParams {
  avatarSort: string;
}

import {
  Container,
  Content,
  HeaderLinear,
  ContainerButtons,
  BackButton,
  BackIcon,
  SignOutButton,
  SignOutIcon,
  AvatarUserLogged,
  EditProfilleContainer,
  Title,
  InputContainer,
  Label,
} from "./styles";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { params } = useRoute();
  const { avatarSort } = params as RouteParams;
  const { user: userLogged, updateUser, signOut } = useAuth();
  const { goBack, navigate } = useNavigation();
  const URL = `https://api-chat-estudo.s3.amazonaws.com/${userLogged.avatar}`;

  const handleEditProfile = useCallback(async () => {
    const data = {
      name,
      email,
      ...(password.length >= 3
        ? {
            password,
            confirmPassword,
          }
        : {}),
    };

    const response = await api.put("profile", data);

    updateUser(response.data);

    navigate("Dashboard");
  }, [name, email, password]);

  return (
    <>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ScrollView>
        <Container>
          <HeaderLinear
            start={[0.5, 1]}
            end={[1, 0.5]}
            colors={["#B510C6", "#B510C6", "#8E3DB5"]}
          >
            <ContainerButtons>
              <BackButton onPress={() => goBack()}>
                <BackIcon name="arrow-back-outline" size={22} color="white" />
              </BackButton>

              <SignOutButton onPress={() => signOut()}>
                <SignOutIcon name="log-out-sharp" size={22} color="white" />
              </SignOutButton>
            </ContainerButtons>
          </HeaderLinear>
          <Content>
            <AvatarUserLogged
              source={{
                uri: URL.indexOf("null") !== -1 ? avatarSort : URL,
              }}
            />

            <EditProfilleContainer>
              <Title>Edite seu perfil</Title>

              <InputContainer>
                <Label>Nome</Label>
                <Input
                  isShowIcon={false}
                  typeInput="text"
                  defaultValue={userLogged.name}
                  onChangeText={(value) => {
                    setName(value);
                  }}
                />
              </InputContainer>

              <InputContainer>
                <Label>Email</Label>
                <Input
                  isShowIcon={false}
                  autoCorrect={false}
                  autoCapitalize="none"
                  typeInput="text"
                  defaultValue={userLogged.email}
                  onChangeText={(value) => {
                    setEmail(value);
                  }}
                  keyboardType="email-address"
                />
              </InputContainer>

              <InputContainer>
                <Label>Senha</Label>
                <Input
                  isShowIcon={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  typeInput="password"
                  onChangeText={(value) => {
                    setPassword(value);
                  }}
                />
              </InputContainer>

              <InputContainer>
                <Label>Confrime sua senha</Label>
                <Input
                  isShowIcon={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  typeInput="password"
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                  }}
                />
              </InputContainer>

              <Button
                style={{ marginTop: "5%" }}
                onPress={() => handleEditProfile()}
                label="Editar"
                active={true}
              />
            </EditProfilleContainer>
          </Content>
        </Container>
      </ScrollView>
    </>
  );
};

export default Profile;
