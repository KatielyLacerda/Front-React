import React, { useState } from "react";
import Button from "./Button"; // Certifique-se de que essa importação está correta
import "./AddTask.css";

const AddTask = ({ handleTaskAddition }) => {
  //vai receber o handelInputChange ´, quando clicarmos no botão ele vai pegar o inputData que nessa caso é task e mandar pro handletaskaddition
  const [inputData, setInputData] = useState("");

  //vai pegar o que o úsuario digitou e colocar no inputData
  const handelInputChange = (e) => {
    setInputData(e.target.value);
    console.log(e);
  };
  //passo no handleTaskAddition o inputData pq, tudo o que o úsucario digitar lá vai pro inputData
  const handelAddTaskClick = () => {
    handleTaskAddition(inputData);
    setInputData("");
  };

  return (
    <div className="add-task-container">
      <input
        onChange={handelInputChange}
        value={inputData}
        className="add-task-input"
        type="text"
      />
      <div className="add-task-button-container">
        <Button onClick={handelAddTaskClick}>Adicionar</Button>
      </div>
    </div>
  );
};

export default AddTask;
