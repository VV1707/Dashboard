import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();

// 1. No date column, few mandate cols absent
// 2. Few mandate cols absent, Null values
// 3. Null values
// 4. Null values, Empty last row
// 5. Empty last row
// 6. Perfect