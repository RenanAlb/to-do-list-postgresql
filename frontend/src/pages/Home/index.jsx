import { Container, Global, Header, Main, Delete, Edit } from "./styles";
import { credenciaisCliente } from "../../utils/clientes";
import { useEffect, useState } from "react";
import {
  criarTarefa,
  deleteTarefas,
  editTarefas,
  getTarefas,
} from "../../utils/tarefas";
import Animation from "../../Components/Animation";

const Home = () => {
  const [dadosUser, setDadosUser] = useState({});
  const [tarefa, setTarefa] = useState("");
  const [fetchTarefas, setFetchTarefas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [indexTarefa, setIndexTarefa] = useState(null);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    const fetchCredenciaisCliente = async () => {
      setIsLoading(true);
      const response = await credenciaisCliente();
      if (response.ok) {
        console.log(response);
        setDadosUser(response.response);
        setIsLoading(false);
      }
    };

    fetchCredenciaisCliente();
  }, []);

  const fetchGetTarefas = async () => {
    setIsLoading(true);
    const response = await getTarefas(dadosUser.id);
    if (response.ok) {
      setFetchTarefas(response.response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dadosUser.id) {
      fetchGetTarefas();
    }
  }, [dadosUser]);

  const handleAdicionarTarefa = async (e) => {
    e.preventDefault();

    if (tarefa === "") {
      console.error("Sem tarefas para adicionar!");
      return null;
    }
    setIsLoading(true);

    const response = await criarTarefa(tarefa, dadosUser.id);

    if (response.ok) {
      setTarefa("");
      fetchGetTarefas();
    }
  };

  const handleDeleteTarefa = async (deleteTarefa) => {
    setIsLoading(true);
    const response = await deleteTarefas(deleteTarefa.id, dadosUser.id);

    if (response.ok) {
      fetchGetTarefas();
    }
  };

  const handleEditTarefa = async (idTarefa) => {
    setIsLoading(true);

    if (novaTarefa === "") {
      return null;
    }

    const response = await editTarefas(idTarefa, dadosUser.id, novaTarefa);

    if (response.ok) {
      setIsEdit(false);
      setNovaTarefa("");
      fetchGetTarefas();
    }
  };

  return (
    <Container>
      {isLoading && <Animation />}
      <Global>
        <Header>Olá, {dadosUser.nome}!</Header>
        <Main>
          <section className="container-tarefas">
            <input
              type="text"
              value={tarefa}
              onChange={(e) => setTarefa(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdicionarTarefa(e);
                }
              }}
              placeholder="Nova tarefa"
            />
            <button onClick={handleAdicionarTarefa}>+</button>
          </section>
          <section className="render-tarefas">
            {fetchTarefas.length > 0 &&
              fetchTarefas.map((renderTarefa, index) => (
                <div key={index} className="tarefa">
                  {isEdit && indexTarefa === index ? (
                    <textarea
                      value={novaTarefa}
                      onChange={(e) => setNovaTarefa(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleEditTarefa(renderTarefa.id);
                        }
                      }}
                      placeholder="Escreva aqui a nova tarefa e clique ENTER para confirmar"
                    ></textarea>
                  ) : (
                    <div className="texto">{renderTarefa.tarefa}</div>
                  )}
                  <div className="controls">
                    <Delete
                      onClick={() => handleDeleteTarefa(renderTarefa)}
                      title="Deletar tarefa"
                    />
                    <Edit
                      onClick={() => {
                        setIsEdit(!isEdit);
                        setIndexTarefa(index);
                      }}
                      title="Editar tarefa"
                    />
                  </div>
                </div>
              ))}
          </section>
        </Main>
      </Global>
    </Container>
  );
};

export default Home;
