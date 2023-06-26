import {useState , useEffect} from 'react';

const API_BASE = "http://localhost:3001";
function App() {

  const [todos, setTodos] = useState([]);
  const [popupActive , setpopupActive] = useState(false);
  const [newTodo , setNewTodo] = useState("");


  useEffect(() => {
   GetTodos();
   console.log(todos);
  } , []);

  const GetTodos = () => {
        fetch(API_BASE + "/todos")
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch(err => console.log("Error" , err));
  }

  const completeTodo = async id => {
        const data = await fetch(API_BASE + "/todo/complete/" + id)
        .then(res => res.json())

        setTodos(todos.map(todo => {
          if(todo._id == data._id)
          {
            todo.complete = data.complete;
          }

          return todo;
        }))
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todo/delete/" + id , {method : "DELETE"})
    .then(res => res.json())
 
    setTodos(todos => todos.filter(todo => todo._id !== data._id));
}

const addTodo = async () => {
  const data = await fetch(API_BASE + "/todo/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      text: newTodo
    })
  }).then(res => res.json());

  setTodos([...todos, data]);

  setNewTodo("");
}


  return (
    <div className="App">
     <h1>Welcome, Varun</h1>
     <h4>YOUR TASKS</h4>

     <div className="todos">

      {todos.map(todo => (
        <div className={"todo " + (todo.complete ? "is-complete" : "")} key = {todo._id} onClick={() => {
          completeTodo(todo._id)
        }}>

        <div className="checkbox"></div>
        <div className="text">{ todo.text}</div>
        <div className="delete" onClick={() => deleteTodo(todo._id)}></div>
        
        </div>
      ))}

     

</div>

<div className="addPopup" onClick={ () => setpopupActive(true)}>+</div>
      

{popupActive ? (
  <div className="popup" >
    <div className="closepopup"  onClick={ () => setpopupActive(false)}>X</div>

    <div className="content">
      <h3>Add Task</h3>
      <input
       type = "text"
       className='add-todo-input'
       onChange={e => setNewTodo(e.target.value)}
       value={newTodo}
      ></input>

      <button className='button' onClick={addTodo}>Submit</button>
    </div>
  </div>
  
) : ""}




     </div>
    
  );
}

export default App;
