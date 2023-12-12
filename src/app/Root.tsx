import App from './App';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<h1>Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<h1>Phones Page</h1>} />
          <Route path="tablets" element={<h1>Tablets Page</h1>} />
          <Route path="accessories" element={<h1>Accessories Page</h1>} />
          <Route path="favorites" element={<h1>Favorites Page</h1>} />
          <Route path="cart" element={<h1>Cart Page</h1>} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </Router>
  )
}