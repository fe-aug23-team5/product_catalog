import React from 'react';
import './App.scss';
import { Header } from '../widgets/Header';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
    </div>
  );
};

export default App;
