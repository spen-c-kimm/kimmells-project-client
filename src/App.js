import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
