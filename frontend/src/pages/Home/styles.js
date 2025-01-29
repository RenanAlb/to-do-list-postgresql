import styled from "styled-components";
import Themes from "../../Themes";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";

export const Container = styled.div`
  background-color: ${Themes.black};
  width: 100%;
  min-height: 100dvh;
`;

export const Global = styled.div`
  width: 95%;
  max-width: 700px;
  min-height: 100dvh;
  margin: auto;
`;

export const Header = styled.header`
  width: 100%;
  height: auto;
  padding: 20px;
  color: white;
  text-align: center;
`;

export const Main = styled.main`
  .container-tarefas {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .container-tarefas input {
    background-color: ${Themes.black};
    border-radius: 5px;
    border: 1px solid ${Themes.dark_gray};
    width: 80%;
    padding: 15px;
    outline: none;
    color: white;
    font-size: 0.9em;
  }
  .container-tarefas button {
    background-color: ${Themes.green};
    border-radius: 5px;
    border: 1px solid ${Themes.dark_gray};
    width: 18%;
    padding: 15px;
    outline: none;
    color: ${Themes.dark_gray};
    font-weight: 700;
    font-size: 1.2em;

    &:hover {
      cursor: pointer;
    }
  }

  .render-tarefas {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    padding: 10px 0;
  }

  .render-tarefas .tarefa {
    background-color: ${Themes.dark_gray};
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    transition: all 0.5s;
  }

  .render-tarefas .tarefa .texto {
    margin-bottom: 20px;
    color: white;
    transition: all 0.5s;
  }

  .render-tarefas .tarefa textarea {
    background-color: ${Themes.dark_gray};
    color: white;
    border: none;
    outline: none;
    width: 100%;
    height: 60px;
    resize: none;
    font-size: 0.9em;
    transition: all 0.5s;
  }
`;

const StyleIcons = `
  color: gray;
  font-size: 1.5em;
  margin-right: 9px;

  &:hover {
    cursor: pointer;
    color: ${Themes.green};
  }
`;

export const Delete = styled(RiDeleteBin5Line)`
  ${StyleIcons}
`;

export const Edit = styled(MdOutlineDriveFileRenameOutline)`
  ${StyleIcons}
`;
