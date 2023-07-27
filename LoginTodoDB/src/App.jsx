import {Routes, Route} from 'react-router-dom'
import Login from "./Login";
import Todolist from "./Todolist";
import Register from "./Register";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Todolist />} />
      </Routes>
    </div>
  );
}
