import "./App.css";
import { Routes, Route } from "react-router-dom";

/*-----------PAGES**********************/
import { Header } from "./components/Header";
import { TodoForm } from "./components/TodoForm";
import { Register } from "./pages/Register";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header></Header>
                <TodoForm></TodoForm>
              </>
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Register />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
