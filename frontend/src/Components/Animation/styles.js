import styled from "styled-components";

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.95);
  width: 100%;
  height: 100dvh;
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;

  p {
    color: white;
    margin-top: 10px;
  }
`;
