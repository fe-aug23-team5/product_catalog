import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { AccessoriesPage } from '../pages/AccessoriesPage/AccessoriesPage';
import { CartPage } from '../pages/CartPage/CartPage';
import { FavouritesPage } from '../pages/FavouritesPage/FavouritesPage';
import { HomePage } from '../pages/HomePage/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage';
import { PhonesPage } from '../pages/PhonesPage/PhonesPage';
import { TabletsPage } from '../pages/TabletsPage/TabletsPage';
import App from './App';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<PhonesPage />} />
          {/* <Route path=':id'/>
          </Route> */}
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
