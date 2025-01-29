import styled from "styled-components";
import Themes from "../../Themes";

export const Container = styled.main`
  background-color: ${Themes.black};
  width: 100%;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;

  h2 {
    color: white;
    margin-bottom: 20px;
  }

  p {
    color: white;
    margin-top: 20px;
    font-size: 0.9em;
  }

  p a {
    color: ${Themes.green};
  }
`;

export const Input = styled.input`
  background-color: ${Themes.black};
  border: 1px solid ${Themes.dark_gray};
  padding: 15px;
  border-radius: 5px;
  color: white;
  font-size: 0.9em;
  outline: none;
  width: 100%;
  margin-bottom: 8px;
`;

export const Button = styled.button`
  background-color: ${Themes.green};
  padding: 15px;
  border-radius: 5px;
  border: none;
  font-size: 0.9em;
  color: ${Themes.dark_gray};

  &:hover {
    cursor: pointer;
  }
`;
