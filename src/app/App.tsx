import React from 'react';
import './App.scss';
import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
