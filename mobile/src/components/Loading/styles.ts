import styled from "styled-components/native";
import { Animated } from "react-native";

export const Container = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  opacity: 0.9;
  flex-direction: row;
`;
export const BallOne = styled(Animated.View)`
  width: 18px;
  height: 18px;
  border-radius: ${18 / 2}px;
  background-color: #b510c6;
`;
export const BallTwo = styled(Animated.View)`
  width: 18px;
  height: 18px;
  border-radius: ${18 / 2}px;
  background-color: #b510c6;
  margin-left: 10px;
`;
export const BallThree = styled(Animated.View)`
  width: 18px;
  height: 18px;
  border-radius: ${18 / 2}px;
  background-color: #b510c6;
  margin-left: 10px;
`;
