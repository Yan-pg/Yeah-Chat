import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const ContentButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 70px;
  margin-left: 15px;
  width: 100px;
`;

export const Content = styled.View`
  flex: 1;
  width: 90%;
  margin: 50px auto;
`;

export const Title = styled.View`
  margin-bottom: 40px;
`;

export const TitleText = styled.Text`
  font-size: 30px;
  color: white;
  font-weight: bold;
`;

export const InputContainer = styled.View`
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  color: #a0a0a0;
  margin-bottom: 10px;
`;

export const ButtonCotainer = styled.View`
  width: 100%;
  align-items: flex-end;
  margin-top: 40px;
`;
