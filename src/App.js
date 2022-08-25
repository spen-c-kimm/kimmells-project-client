import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home"
import Signup from "./Views/Signup"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" exact element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
