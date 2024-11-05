import React from 'react';
import './Mainpage.css';

function App() {
  return (
    <div>
      <header className="header">
        <div className="logo">TEX</div>
        <div className="nav">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
          <a href="#">Log In</a>
          <a href="#">Sign Up</a>
          <button className="upload-button">UPLOAD DASHBOARD</button>
          <a href="#">Notification</a>
          <a href="#">Settings</a>
        </div>
      </header>
      <main className="main">
        <h1>THE EXPLORER’S DEN</h1>
        <p>Find and share dashboards in one platform.</p>
      </main>
    </div>
  );
}

export default App;