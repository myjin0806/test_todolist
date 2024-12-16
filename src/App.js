import './styles/App.css';
import TodoList from './components/TodoList';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);


  const addTodo = () => {
    if (!input.trim()) {
      alert('할 일을 입력해주세요!');
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text: input, completed: false },
    ]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editingText } : todo
      )
    );
    setEditingId(null);
    setEditingText('');
  };

  const toggleShowCompleted = () => {
    setShowCompleted((prevState) => !prevState);
  };
    // 🌟 isDarkMode 변경 시 body 클래스 업데이트
    useEffect(() => {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const filteredTodos = todos.filter((todo) =>
    showCompleted ? true : !todo.completed
  );

  return (
    <div className={`Wrap ${isDarkMode ? 'dark-mode' : ''}`}>
      <h2>ToDoList</h2>
      <div className={`statsContainer ${isDarkMode ? 'dark-mode' : ''}`}>
        <p>전체: {todos.length}</p>
        <p>완료: {todos.filter((todo) => todo.completed).length}</p>
        <p>미완료: {todos.length - todos.filter((todo) => todo.completed).length}</p>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="할 일을 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={isDarkMode ? 'dark-mode' : ''}
        />
        <button onClick={addTodo} className={isDarkMode ? 'dark-mode' : ''}>
          추가
        </button>
      </div>
      <div className="controlContainer">
        <button
          className={`toggleCompleted ${isDarkMode ? 'dark-mode' : ''}`}
          onClick={toggleShowCompleted}
        >
          {showCompleted ? '완료 항목 숨기기' : '완료 항목 보이기'}
        </button>
        <button
          className={`toggleDarkMode ${isDarkMode ? 'dark-mode' : ''}`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? '라이트 모드' : '다크 모드'}
        </button>
      </div>
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        startEdit={startEdit}
        saveEdit={saveEdit}
        editingId={editingId}
        editingText={editingText}
        setEditingText={setEditingText}
        isDarkMode={isDarkMode} // 다크 모드 전달
      />
    </div>
  );
}

export default App;
