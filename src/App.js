import React, { useState } from "react";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <div className="App-content">
        <nav className="navbar">
          <div className="navbar-left">
            <button onClick={toggleSidebar}>Toggle Sidebar</button>
          </div>
          <h1>Patient and Medicine Stock Management</h1>
        </nav>
        <div className="container">
          <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
            <ul>
              <li>Dashboard</li>
              <li>Patients</li>
              <li>Medicines</li>
              <li>Stock</li>
              <li>Reports</li>
            </ul>
          </aside>
          <main className="main-content">{/* Content will go here */}</main>
        </div>
      </div>
    </div>
  );
}

export default App;
