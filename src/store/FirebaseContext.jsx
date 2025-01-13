import React, { createContext, useContext, useState } from "react";

import { auth, db } from "../firebase/config";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState("hello");
  return (
    <FirebaseContext.Provider value={{ auth, db, user, setUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};
