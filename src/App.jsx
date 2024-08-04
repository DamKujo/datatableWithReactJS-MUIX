import React, { useState } from 'react'
import Table from './Table'
import './App.css';


function App() {
  const [theme, setTheme] = useState(() => {
    const mode = JSON.parse(localStorage.getItem("mode"));
    return mode || "light";
  });
  const [isChecked, setIsChecked] = useState(theme === "dark");

  const switchTheme = () => {
    setTheme((cur) => {
      const newTheme = cur === "light" ? "dark" : "light";
      localStorage.setItem("mode", JSON.stringify(newTheme));
      return newTheme;
    }),
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="wrapper" id={theme}>
      <div className="toggle-container">
        <p className={theme === "light" ? "not-change-text" : "change-text"}>{theme} mode</p>
        <input onChange={switchTheme} type="checkbox" id="toggle-btn" checked={isChecked}/>
        <label htmlFor="toggle-btn" className={theme === "light" ? "toggle-label" : "toggle-label checked"}></label>
      </div>
      
      <div className="container">
        <div id="sun" className="shape"></div>
        <div id="moon" className="shape"></div>
      </div>
      <Table/>
    </div>
  )
}

export default App
