import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import Login from "./components/Login.jsx";
import MainScreen from "./components/MainScreen.jsx";
import Register from "./components/Register.jsx";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Strona główna */}
          <Route path="/login" element={<Login />} /> {/* Strona logowania */}
          <Route path="/register" element={<Register />} />{" "}
          {/* Strona logowania */}
          <Route path="/trips" element={<MainScreen />} />{" "}
          {/* Strona logowania */}
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
