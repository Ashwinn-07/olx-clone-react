import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { FirebaseContext } from "./store/FirebaseContext.jsx";
import { onAuthStateChanged } from "firebase/auth";
import Create from "./pages/Create.jsx";
import View from "./pages/ViewPost.jsx";

function App() {
  const { setUser, auth } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
