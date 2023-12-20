import React from 'react';
// import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';
import { TestSlider } from '../features/TestSlider/TestSlider';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <main className="main">
        {/* <Outlet /> */}
        <TestSlider />
      </main>

      <Footer />
    </div>
  );
};

export default App;
