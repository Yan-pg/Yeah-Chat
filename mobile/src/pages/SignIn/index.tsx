import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/Auth";

import {
  Container,
  Content,
  Title,
  TitleText,
  InputContainer,
  Label,
  Question,
  GoSingUpButton,
  GoSingUp,
  ButtonCotainer,
} from "./styles";

import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IsErrorContext } from "../../contexts/IsError";
import { IsLoadingContext } from "../../contexts/isLoading";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validateEmail, setValidadeEmail] = useState(false);
  const [validadePassword, setValidadePassword] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const navigation = useNavigation();
  const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
  const { signIn } = useAuth();
  const { setError } = useContext(IsErrorContext);
  const { setLoading } = useContext(IsLoadingContext);

  useEffect(() => {
    if (validadePassword && validateEmail) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }, [validadePassword, validateEmail]);

  const handleSignIn = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        await signIn({
          email,
          password,
        });
      } catch (err) {
        setLoading(false);
        setError(
          true,
          "Ocorreu um erro ao fazer o login, cheque as credenciais"
        );
        console.log(err);
      }
    }, 2000);
  };

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Container>
            <Content>
              <Title>
                <TitleText>
                  Vamos lá !{"\n"}Qual o seu email e {"\n"}senha ?
                </TitleText>
              </Title>
              <InputContainer>
                <Label>Email</Label>
                <Input
                  isShowIcon={false}
                  autoCorrect={false}
                  autoCapitalize="none"
                  typeInput="text"
                  keyboardType="email-address"
                  onChangeText={(value) => {
                    setEmail(value);
                    value.match(regEx)
                      ? setValidadeEmail(true)
                      : setValidadeEmail(false);
                  }}
                />
              </InputContainer>

              <InputContainer>
                <Label>Senha</Label>
                <Input
                  isShowIcon={true}
                  autoCorrect={false}
                  typeInput="password"
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setPassword(value);
                    value.length >= 6
                      ? setValidadePassword(true)
                      : setValidadePassword(false);
                  }}
                />
              </InputContainer>

              <Question>Ainda não conta ?</Question>
              <GoSingUpButton onPress={() => navigation.navigate("SignUp")}>
                <GoSingUp>Cadaste-se gratuitamente</GoSingUp>
              </GoSingUpButton>

              <ButtonCotainer>
                <Button
                  onPress={() => handleSignIn()}
                  label="Entrar"
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

export default SignInPage;
