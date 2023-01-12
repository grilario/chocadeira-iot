import styled from "styled-components/native";

interface SecondaryContainerControlProps {
  enable: boolean;
}

export const Container = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const MasterContainerControl = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SecondaryContainerControl = styled.View<SecondaryContainerControlProps>`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  opacity: ${(props) => (props.enable ? 1 : 0.5)};
`;
