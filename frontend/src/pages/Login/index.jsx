import { Container, Form, Input, Button } from "./styles";
import { loginCliente } from "../../utils/clientes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Animation from "../../Components/Animation";

const Login = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (nome === "" || senha === "") {
      return console.error("Sem credenciais");
    }

    setIsLoading(true);

    const response = await loginCliente(nome, senha);

    console.log(response);

    if (response?.ok) {
      navigate("/home");
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading && <Animation />}
      <Form onSubmit={handleSubmitForm}>
        <h2>Login</h2>
        {error && (
          <span style={{ color: "#F05E4D", marginBottom: "10px" }}>
            Usuário ou senha incorretos!
          </span>
        )}

        <Input
          type="text"
          placeholder="Nome de usuário"
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit">Cadastrar</Button>
        <p>
          Não tem uma conta? <a href="/cadastro">Clique aqui</a>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
