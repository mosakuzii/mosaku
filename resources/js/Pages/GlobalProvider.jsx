import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    user: { name: "ユーザー名", age: 30 },
    settings: { theme: "dark", language: "ja" }
  });

  // globalStateを更新する関数
  const updateGlobalState = (newState) => {
    setGlobalState(prevState => ({ ...prevState, ...newState }));
  };

  return (
    <GlobalContext.Provider value={{ globalState, updateGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
