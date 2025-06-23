import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Signup } from "./components/Signup";
import { Login } from "./components/Login";
import { Welcome } from "./components/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Welcome />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/:groupId"
          element={<Home />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
