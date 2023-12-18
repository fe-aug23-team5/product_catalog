import React from 'react';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { GlobalProvider } from '../shared/utils/GlobalProvider';
import App from './App';
import { HomePage } from '../pages/HomePage/HomePage';
import { PhonesPage } from '../pages/PhonesPage/PhonesPage';
import { TabletsPage } from '../pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../pages/AccessoriesPage/AccessoriesPage';
import { FavouritesPage } from '../pages/FavouritesPage/FavouritesPage';
import { CartPage } from '../pages/CartPage/CartPage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';

import {
  ProductDetailsPage,
} from '../pages/ProductDetailsPage/ProductDetailsPage';

export const Root = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="phones" element={<PhonesPage />} />
            <Route path="phones/:phoneId" element={<ProductDetailsPage />} />
            <Route path="tablets" element={<TabletsPage />} />
            <Route path="tablets/:tabletId" element={<ProductDetailsPage />} />
            <Route path="accessories" element={<AccessoriesPage />} />
            <Route path="accessories/:accId" element={<ProductDetailsPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </GlobalProvider>
  );
};
