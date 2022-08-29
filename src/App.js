import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import Signup from "./Views/Signup";
import Feed from "./Views/Feed";
import Profile from "./Views/Profile";
import Replies from "./Views/Replies";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/feed" exact element={<Feed />} />
          <Route path="/profile/:userID" exact element={<Profile />} />
          <Route path="/replies/:postID" exact element={<Replies />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
