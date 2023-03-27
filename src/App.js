import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import ActivityDetail from "./pages/Dashboard/ActivityDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/detail/:id" element={<ActivityDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
