
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  const location = useLocation();
  console.log('Current route:', location.pathname);
  
  return (
    <Routes>
      <Route path="/*" element={<BasicLayout />} />
    </Routes>
  );
}

export default App;
