import React, { createContext, useState } from "react";
import run from "../config/gemini.js";

const Context = createContext();

const ContextProvider = (props) => {
  const onSent = async (prompt) => {
    await run(prompt);
  };

  onSent("What is React JS?");

  const contextValue = {};

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
export { Context };
