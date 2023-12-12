import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from '../widgets/Header';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;