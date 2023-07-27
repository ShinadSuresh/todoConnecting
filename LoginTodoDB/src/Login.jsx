
import React  from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToken, addUserName } from "./store/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const navigate = useNavigate();

  if (isAuth) {
    navigate("/");
  }
  
  const userRef = React.useRef(null);
  const passRef = React.useRef(null);
  const apiKey = useSelector((state) => state.user.apiKey);
  const token = useSelector((state) => state.user.token);
  const userName=useSelector((state)=>state.user.userName);
  const dispatch = useDispatch();
  localStorage.setItem("token", token); localStorage.setItem("name", userName);
 
  async function onSubmitHandler(event) {
      try {
          event.preventDefault();
          const username = userRef.current.value;
          const password = passRef.current.value;
          
          const response = await axios.post(
              "https://todolist-api-nq54.onrender.com/users/login",
              {
                  username,
                  password,
                  apiKey
                }
                
                );
                
                const token = response.data.data.token
                
                if (response.data.status === "success") {
                    dispatch(addToken(token));
                    dispatch(addUserName(username));
                    
                    navigate("/");
                    
                    
                } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }

  }

  

  return (
    <form onSubmit={onSubmitHandler}>
      <input ref={userRef} name="username" type="text" placeholder="username" />
      <input
        ref={passRef}
        name="password"
        type="password"
        placeholder="password"
      />
      <button>Login</button>
    </form>
  );
}
