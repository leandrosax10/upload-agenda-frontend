import './App.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <button
              onClick={() => modifyTodoStatusTodo(todo)}
                className="checkbox"
                style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}
              ></button>
              <p>{todo.titulo}</p>
              <p>{todo.name}</p>
              <p>{todo.data}</p>
              <p>{todo.hora}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
              </button>
              <button onClick ={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
              </button>
            </div>
  
          );
        })}
      </div>
    );
  };


  async function handleWithNewButton(){
    setInputVisibility(!inputVisibility);
  }

  async function handleWithEditButtonClick(todo){
    setSelectedTodo(todo)
    setInputVisibility(true)

  }

  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos")
    setTodos(response.data);
  }

  async function deleteTodo(todo) {
    const response = await axios.delete(`http://localhost:3333/todos/${todo.id}`);
    getTodos();
  }

  async function modifyTodoStatusTodo(todo){
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
      titulo: todo.titulo,
      nome: todo.nome,
      data: todo.data,
      hora: todo.hora,
    });
    getTodos();
  }

  async function editTodo(){
    const response = await axios.put("http://localhost:3333/todos", {
      id: selectedTodo.id,
      name: inputValueNome,
      titulo: inputValueTitulo,
      data: inputValueData,
      hora: inputValueHora,
      
    });
    setSelectedTodo();
    setInputVisibility(false);
    getTodos();
    setInputValueTitulo("");
    setInputValueNome("");
    setInputValueData("");
    setInputValueHora("");
  }

  //função que cria as todo
  async function createTodo(){
    const response = await axios.post("http://localhost:3333/todos", {
      titulo:inputValueTitulo, name:inputValueNome, data:inputValueData, hora:inputValueHora, status:inputStatus,
    });
    getTodos();
    setInputVisibility(!inputVisibility);
    setInputValueTitulo("");
    setInputValueNome("");
    setInputValueData("");
    setInputValueHora("");
  }

  
  const [todos, setTodos] = useState([]);
  const [inputValueNome, setInputValueNome] = useState("")
  const [inputValueTitulo, setInputValueTitulo] = useState("")
  const [inputValueData, setInputValueData] = useState("")
  const [inputValueHora, setInputValueHora] = useState("")
  const [inputStatus, setInputValueStatus] = useState("")

  const [inputVisibility, setInputVisibility] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState() 

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Agenda Tarefas</h1>
        </div>
        <Todos todos={todos}></Todos>

        {/* Titulo*/}
        <input value ={inputValueTitulo} 
        style={{display: inputVisibility ? "block" : "none"}}
        onChange={(event) => {
          setInputValueTitulo(event.target.value);
        }} 
        className="inputTitulo" placeholder="Titulo"
        ></input>
        {/* Nome*/}
        <input value ={inputValueNome} 
        style={{display: inputVisibility ? "block" : "none"}}
        onChange={(event) => {
          setInputValueNome(event.target.value);
        }} 
        className="inputName" placeholder="Nome"
        ></input>

        {/* Data*/}
        <input value ={inputValueData} 
        style={{display: inputVisibility ? "block" : "none"}}
        onChange={(event) => {
          setInputValueData(event.target.value);
        }} 
        className="inputData" placeholder="Data"
        ></input>

        {/* Hora*/}
        <input value ={inputValueHora} 
        style={{display: inputVisibility ? "block" : "none"}}
        onChange={(event) => {
          setInputValueHora(event.target.value);
        }} 
        className="inputHora" placeholder="Hora"
        ></input>

        {/* Botao de adicionar*/}
        <button onClick={ inputVisibility ? selectedTodo ? editTodo : createTodo : handleWithNewButton} className="newTaskButton">
          {inputVisibility ? "Confirmar" : "Adiconar"}</button>
      </header>
    </div>
  );
}

export default App;
