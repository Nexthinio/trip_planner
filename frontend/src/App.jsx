import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.jsx";
import Login from "./Login.jsx";
import MainScreen from "./MainScreen.jsx";
import Register from "./Register.jsx"

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Strona główna */}
          <Route path="/login" element={<Login />} /> {/* Strona logowania */}
          <Route path="/register" element={<Register />} /> {/* Strona logowania */}
          <Route path="/trips" element={<MainScreen />} />{" "}
          {/* Strona logowania */}
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
