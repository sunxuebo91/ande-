
import React from 'react';
import { ConfigProvider } from 'antd';
import { Routes, Route, useLocation } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  const location = useLocation();
  console.log('Current route:', location.pathname);
  
  return (
    <ConfigProvider
      theme={{
        cssVar: true,
        hashed: false,
      }}
    >
      <Routes>
        <Route path="/*" element={<BasicLayout />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
