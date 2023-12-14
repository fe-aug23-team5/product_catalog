import React from 'react';
import './CategiesMenu.scss';
import { Link } from 'react-router-dom';
import phonesImg from '../../shared/static/categories_phones.jpg';
import tabletsImg from '../../shared/static/categories_tablets.jpg';
import accImg from '../../shared/static/categories_acc.jpg';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';

export const CategoriesMenu: React.FC = () => {
  return (
    <section className="categories_section">
      <SecondaryTitle>
        Shop by category
      </SecondaryTitle>

      <div className="categories_menu">
        <article className="category_item">
          <div className="category_link">
            {/* to="/phones" */}
            <img
              className="category_image"
              src={phonesImg}
              alt="brand new phone"
            />
          </div>

          <h3 className="category_title">Mobile Phones</h3>

          <p className="category_desc">
            95 Models
          </p>
        </article>

        <article className="category_item">
          <Link to="/tablets" className="category_link">
            <img
              className="category_image"
              src={tabletsImg}
              alt="brand new tablets"
            />
          </Link>

          <h3 className="category_title">Tablets</h3>

          <p className="category_desc">
            24 Models
          </p>
        </article>

        <article className="category_item">
          <Link to="/accessories" className="category_link">
            <img
              className="category_image"
              src={accImg}
              alt="brand new phone cases"
            />
          </Link>

          <h3 className="category_title">Accessories</h3>

          <h4 className="category_desc">
            100 Models
          </h4>
        </article>
      </div>
    </section>
  );
};
