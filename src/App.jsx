import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importe Routes

import Header from "./componentes/Header";
import Tasks from "./componentes/Tasks";
import AddTask from "./componentes/AddTask"; // certifica-se que o nome dos arquivos e componentes estão corretos
import TaskDetails from "./componentes/TaskDetails"; // Assumindo que você tem esse componente
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.cypress.io/todos?_limit=10"
      );

      setTasks(data);
    };

    fetchTasks();
  }, []);

  // função que vai mudar o status da tarefa, pra usar quando for fazer ela
  const handleTaskClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, completed: !task.completed };
      return task;
    });
    setTasks(newTasks);
  };

  // recebe a task depois do usuário ter clicado em verificar, ele recebe o task do handle task Click
  // aí essa função pega o inputData (que nesse caso é o taskTitle, e adiciona na task e setar no final)
  const handleTaskAddition = (taskTitle) => {
    const newTasks = [
      ...tasks,
      {
        title: taskTitle,
        id: uuidv4(),
        completed: false,
      },
    ];
    setTasks(newTasks);
  };

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          {" "}
          {/* Envolver os componentes Route com Routes */}
          <Route
            path="/"
            element={
              <>
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks
                  tasks={tasks}
                  handleTaskClick={handleTaskClick}
                  handleTaskDeletion={handleTaskDeletion}
                />
              </>
            }
          />
          {/* Correção: Mova esta rota para dentro de <Routes> e ajuste a sintaxe para usar element */}
          {/* Ajuste para a rota TaskDetails */}
          <Route path="/:taskTitle" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
// lembrar de fazer um detate
