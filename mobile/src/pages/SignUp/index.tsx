import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

import {
  Container,
  ContentButton,
  Content,
  Title,
  TitleText,
  InputContainer,
  Label,
  ButtonCotainer,
} from "./styles";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IsLoadingContext } from "../../contexts/isLoading";
import { IsErrorContext } from "../../contexts/IsError";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateName, setValidateName] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [validatePassword, setValdidePassword] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const { goBack } = useNavigation();
  const { setLoading } = useContext(IsLoadingContext);
  const { setError } = useContext(IsErrorContext);
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

  useEffect(() => {
    if (validateName && validatePassword && validateEmail) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }, [validateName, validatePassword, validateEmail]);

  const handleSignUp = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        await api.post("/users", {
          name,
          email,
          password,
        });

        setLoading(false);
        goBack();
      } catch (err) {
        setLoading(false);
        setError(true, "Ocorreu um erro ao fazer o cadastro, tente novamente");
      }
    }, 3000);
  };

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#252330" }}>
        <ScrollView>
          <Container>
            <ContentButton onPress={() => goBack()}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </ContentButton>

            <Content>
              <Title>
                <TitleText>Cadastre com os {"\n"}seguintes dados. </TitleText>
              </Title>
              <InputContainer>
                <Label>Nome</Label>
                <Input
                  isShowIcon={false}
                  keyboardType="email-address"
                  typeInput="text"
                  autoCorrect={true}
                  onChangeText={(value) => {
                    setName(value);
                    value.length >= 3
                      ? setValidateName(true)
                      : setValidateName(false);
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
                  onChangeText={(value) => {
                    setEmail(value);
                    value.match(regEx)
                      ? setValidateEmail(true)
                      : setValidateEmail(false);
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
                    value.length >= 6
                      ? setValdidePassword(true)
                      : setValdidePassword(false);
                  }}
                />
              </InputContainer>

              <ButtonCotainer>
                <Button
                  onPress={() => (isActiveButton ? handleSignUp() : null)}
                  label="Cadastrar"
                  active={isActiveButton}
                />
              </ButtonCotainer>
            </Content>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
