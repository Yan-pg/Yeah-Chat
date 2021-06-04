import React from "react";
import { RectButtonProperties } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProperties {
  label: string;
  active: boolean;
}

import {
  Container,
  ButtonContainer,
  ButtonText,
  InactiveButton,
} from "./styles";

const Button: React.FC<ButtonProps> = ({ label, active, ...res }) => {
  return (
    // <Container colors={["#B510C6", "#7465FD"]} active={active} {...res}>
    <>
      {!active ? (
        <InactiveButton {...res}>
          <ButtonText>{label}</ButtonText>
        </InactiveButton>
      ) : (
        <ButtonContainer {...res}>
          <Container
            start={[0.5, 1]}
            end={[1, 0.5]}
            colors={["#B510C6", "#B510C6", "#8E3DB5"]}
          >
            <ButtonText>{label}</ButtonText>
          </Container>
        </ButtonContainer>
      )}
    </>
  );
};

export default Button;
