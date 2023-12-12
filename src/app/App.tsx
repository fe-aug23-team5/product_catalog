import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <div className="main">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default App;
