import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import Dashboard from "./pages/Dashboard.js";
import Register from "./pages/Register.js";
import Insert from "./pages/Insert.js";
import Statistics from "./pages/Statistics.js";

function App() {

  return (
    <div className="App">
    <BrowserRouter>
    
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/insert" element={ <Insert /> } />
        <Route path="/stats" element={ <Statistics /> } />

      </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;
