import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './index.css';

ReactDOM.render(
  <Router> {/* Wrap your entire app with BrowserRouter */}
    <App />
  </Router>,
  document.getElementById('root')
);
