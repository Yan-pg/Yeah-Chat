import React, { useEffect } from "react";
import { Animated } from "react-native";

import { Container, BallOne, BallTwo, BallThree } from "./styles";

const Loading: React.FC = () => {
  const translateYBallOne = new Animated.Value(0);
  const translateYBallTwo = new Animated.Value(0);
  const translateYBallThree = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateYBallThree, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),

        Animated.timing(translateYBallOne, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.timing(translateYBallTwo, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.timing(translateYBallOne, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.timing(translateYBallTwo, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),

        Animated.timing(translateYBallThree, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Container>
      <BallOne
        style={{
          opacity: translateYBallOne,
        }}
      />
      <BallTwo
        style={{
          opacity: translateYBallTwo,
        }}
      />
      <BallThree
        style={{
          opacity: translateYBallThree,
        }}
      />
    </Container>
  );
};

export default Loading;
