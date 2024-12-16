import './styles/App.css';
import TodoList from './components/TodoList';
import { useState } from 'react';
import './styles/Todo.css'

function App() {
  const [todos, setTodos]=useState([]);//투두리스트 데이터 저장
  const [input, setInput]=useState('');//입력값 저장
  const addTodo =()=>{
    if(!input.trim()) return; //빈입력값 검증 
    setTodos((prevTodos)=>[
      ...prevTodos,//새배열생성, 스프레드 연산자
      {id:Date.now(), text:input, completed:false},
      ]);
      setInput('')//입력값 초기화
    };
  //완료상태 토글
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  //할 일 삭제
  const deleteTodo = (id)=>{
    setTodos((prevTodos)=> prevTodos.filter((todo)=>todo.id !== id))
  };
  return (
    <div className='Wrap'>
      <h2>ToDoList</h2>
      <div className="inputContainer">
        <input 
          type="text" 
          placeholder='할 일을 입력하세요...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo} className='AddBtn'>추가</button>
      </div>
      <TodoList todos={todos} toggleComplete={toggleComplete}
      deleteTodo={deleteTodo}/>
    </div>
  );
}

export default App;