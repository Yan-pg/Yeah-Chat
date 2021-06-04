import React, { useCallback, useContext, useEffect } from "react";
import { Animated, Dimensions, StatusBar } from "react-native";
import { IsErrorContext } from "../../contexts/IsError";

interface ModalErrorProps {
  subTitle?: string;
}

import {
  ModalContainer,
  Content,
  Title,
  Description,
  ButtonClose,
  CloseIcon,
} from "./styled";

const ModalError: React.FC<ModalErrorProps> = ({
  subTitle,
}: ModalErrorProps) => {
  const { width } = Dimensions.get("window");
  const getWidthPorcent = width * 0.85;
  const offset = new Animated.ValueXY({ x: 0, y: -300 });
  const fadeIn = new Animated.Value(0);
  const { setError } = useContext(IsErrorContext);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(offset.y, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [setError]);

  const closeModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(offset.y, {
        toValue: -300,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => {
      setError(false, "");
    }, 600);
  }, [offset.y]);

  return (
    <>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ModalContainer
        width={getWidthPorcent}
        style={{
          opacity: fadeIn,
          transform: [{ translateY: offset.y }],
        }}
      >
        <Content>
          <Title>Houve um problema</Title>
          <Description>{subTitle}</Description>

          <ButtonClose onPress={closeModal}>
            <CloseIcon name="closecircleo" size={20} color="white" />
          </ButtonClose>
        </Content>
      </ModalContainer>
    </>
  );
};

export default ModalError;
