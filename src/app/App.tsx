import React from 'react';
// import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from '../pages/ProductDetailsPage/ProductDetailsPage';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <div className="main">
        {/* <Outlet /> */}
        <ProductDetailsPage />
      </div>

      <Footer />
    </div>
  );
};

export default App;
