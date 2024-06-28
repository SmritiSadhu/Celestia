import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import GenerateTech from "./pages/generateTech";
import GenerateNontech from "./pages/generateNontech";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tech" element={<GenerateTech />} />
          <Route path="/nontech" element={<GenerateNontech />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
