const url = "http://localhost:8080";

export const criarTarefa = async (tarefa, id) => {
  try {
    const response = await fetch(`${url}/tarefas/criar-nova-tarefa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tarefa, id }),
    });

    if (!response.ok) {
      throw new Error("Erro inesperado ao criar a tarefa");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTarefas = async (id) => {
  try {
    const response = await fetch(`${url}/tarefas/get-tarefas?id=${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Erro inesperado ao buscar as tarefas");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTarefas = async (idTarefa, idUser) => {
  try {
    const response = await fetch(
      `${url}/tarefas/delete-tarefa/${idTarefa}/${idUser}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Erro inesperado ao deletar a tarefa");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editTarefas = async (idTarefa, idUser, novaTarefa) => {
  try {
    const response = await fetch(
      `${url}/tarefas/edit-tarefa/${idTarefa}/${idUser}/${novaTarefa}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Erro inesperado ao editar a tarefa");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
