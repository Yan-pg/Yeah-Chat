import React, { useEffect, useState } from "react";
import { Animated, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface TabBarProps {
  isAnimatedValue: boolean;
}

import { Container, Icon, MessagePlusIcon, Content, IconHome } from "./styles";

const TabBar: React.FC<TabBarProps> = ({ isAnimatedValue }: TabBarProps) => {
  const [selected, setSelected] = useState(1);
  const offset = new Animated.ValueXY({ x: 0, y: 0 });
  const { width } = Dimensions.get("window");
  const leftCotainer = (width - 200) / 2;

  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: isAnimatedValue ? -10 : 110,
      speed: 2,
      bounciness: 12,
      useNativeDriver: true,
    }).start();
  }, [isAnimatedValue]);

  return (
    <Container
      style={{
        transform: [
          {
            translateY: offset.y,
          },
        ],
      }}
      left={leftCotainer}
    >
      <Content
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => setSelected(0)}>
          <MessagePlusIcon
            name="message-plus"
            size={30}
            color={selected !== 0 ? "#4d4d50" : "#b510c6"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelected(1)}>
          <IconHome
            name="home"
            size={30}
            color={selected !== 1 ? "#4d4d50" : "#b510c6"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelected(2)}>
          <Icon
            name="user"
            size={30}
            color={selected !== 2 ? "#4d4d50" : "#b510c6"}
          />
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

export default TabBar;
