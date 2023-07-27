import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

export default function Todolist() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const datas = useSelector((state) => state.todo.data);
  const userName = useSelector((state) => state.user.userName);
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  console.log(userName, datas, ';hsdiufhdsi');
  console.log(token);
  const [state, setState] = useState([]);
  const [input,setInputValue] = useState("");
  const [bool,setBool] = useState(false)
  console.log(input)


  const handChange=(e)=>{
    setInputValue(e.target.value)
    console.log(e.target.value);
  }

  const userCredentials = {
    username: name
  };

  const handelClick = (e) => {
    e.preventDefault();
    setInputValue(inputRef.current.value)
    
    const newTodo = {
      todo: input,
      username: userName
    };

    axios.post('https://todolist-api-nq54.onrender.com/users/todo', newTodo, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        console.log(response.data);  
        setBool(!bool)
        inputRef.current.value=''
      })
      .catch(error => {
        console.error(error.response.data);
      });
  };

  

  useEffect(() => {
    axios.get('https://todolist-api-nq54.onrender.com/users/todo', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: userCredentials
    })
      .then(response => {
        console.log(response.data.data.todolist, "helloo");
        setState( response.data.data.todolist)

      })
      .catch(error => {
        console.error(error.response.data);
      });
  },[bool]);



  const handleDelete = (id) => {
    const todoToDelete = {
      username: userName,
      todoId: id
    };

    axios.delete('https://todolist-api-nq54.onrender.com/users/todo', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: todoToDelete
    })
      .then(response => {
        console.log(response.data);
        setBool(!bool)
      })
      .catch(error => {
        console.error(error.response.data);
      });

  }

  return (
    <div>
      <form onSubmit={handelClick}>
        <input
          type="text"
          ref={inputRef}
          placeholder="add value "
          name="addValue"
          onChange={handChange}
        />
        <button type="submit" >submit</button>
      </form>
      <h1>Todo List</h1>
      <ul>
        {state.map(({ id, title }) => (
          <div key={id}>
            <li>{title}</li>
            <button  onClick={() => handleDelete(id)}>delete</button>
            <button>edit</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
