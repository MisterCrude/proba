import styled from "@src/styles";

export const Wrapper = styled.div`
  display: flex;
  flex-directio: column;
  background-color: ${({ theme: { palette } }) => palette.grayLight};
`;
