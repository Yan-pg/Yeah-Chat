import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  icon?: string;
  isShowIcon: boolean;
  typeInput?: string;
  nameIcon?: string;
}

import {
  Container,
  Icon,
  ShowPasswordButton,
  ContentInput,
  IconContainer,
} from "./styles";

const Input: React.FC<InputProps> = ({
  value,
  icon,
  isShowIcon,
  nameIcon,
  typeInput,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Container>
        {typeInput === "password" && (
          <TextInput
            style={{
              height: 50,
              fontSize: 12,
              backgroundColor: "#1e1c27",
              borderRadius: 7,
              color: "#A0A0A0",
              padding: 15,
            }}
            secureTextEntry={showPassword ? false : true}
            keyboardAppearance="dark"
            {...props}
          />
        )}
        {isShowIcon && typeInput === "password" && (
          <ShowPasswordButton onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={23}
              color="#909092"
            />
          </ShowPasswordButton>
        )}

        {typeInput !== "password" && (
          <ContentInput>
            <TextInput
              style={{
                width: isShowIcon ? "90%" : "100%",
                fontSize: 14,
                color: "#A0A0A0",
                padding: 15,
                justifyContent: "flex-end",
                alignSelf: "flex-end",
              }}
              keyboardAppearance="dark"
              placeholderTextColor="#909092"
              {...props}
            />
            {isShowIcon && typeInput !== "password" && (
              <IconContainer>
                <Icon name={icon} size={23} color="#909092" />
              </IconContainer>
            )}
          </ContentInput>
        )}
      </Container>
    </>
  );
};
export default Input;
