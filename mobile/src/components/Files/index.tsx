import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { Animated, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface FilesProps {
  recipient_id: string;
}

import {
  Container,
  CameraContainer,
  IconCamera,
  GalleryContainer,
  IconGallery,
} from "./styles";
import api from "../../services/api";
import { useAuth } from "../../hooks/Auth";

const Files: React.FC<FilesProps> = ({ recipient_id }: FilesProps) => {
  const [image, setImage] = useState("");

  const translateY = new Animated.Value(0);
  const opacity = new Animated.Value(0);
  const { navigate } = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: -200,
      bounciness: 16,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      // console.log(result);
      // const data = new FormData();
      // const path = result.uri.split("/");
      // const name = path[path.length - 1];
      // data.append("imageMessage", {
      //   type: result.type,
      //   name: name,
      //   uri: result.uri,
      // });
      // console.log(data);
      // await api
      //   .post("posts", {
      //     data,
      //     recipient_id,
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  };

  return (
    <Container style={{ transform: [{ translateY }] }}>
      <CameraContainer onPress={() => navigate("Camera")}>
        <IconCamera name="camera" size={20} color="white" />
      </CameraContainer>
      <GalleryContainer onPress={pickImage}>
        <IconGallery name="picture-o" size={20} color="white" />
      </GalleryContainer>
    </Container>
  );
};

export default Files;
