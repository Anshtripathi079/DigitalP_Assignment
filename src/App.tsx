import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Forecast from "./pages/Forecast";
import Error from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forecast />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
