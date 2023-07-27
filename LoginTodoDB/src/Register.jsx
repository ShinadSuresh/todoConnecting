
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken } from "./store/userSlice";
import axios from 'axios'

export default function Register() {
  const userRef = React.useRef(null);
  const passRef = React.useRef(null);
  const apiKey = useSelector((state) => state.user.apiKey);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmitHandler(event) {
    try {
      event.preventDefault();
      const username = userRef.current.value;
      const password = passRef.current.value;

      const response = await axios.post(
        "https://todolist-api-nq54.onrender.com/users/registration",
        {
          username,
          password,
          apiKey
        }
      );

      if (response.data.status === "success") {
        dispatch(addToken(response.data.token));
        navigate("/login");
       
      }
    } catch (error) {
      alert(error.message);
    }
  }
  

  return (
    <form onSubmit={onSubmitHandler}>
      <input ref={userRef} type="text" placeholder="username" />
      <input ref={passRef} type="password" placeholder="password" />
      <button>Register</button>
    </form>
  );
}
