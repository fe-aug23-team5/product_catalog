import React, { useEffect, useState } from 'react';
import './CategiesMenu.scss';
import { Link } from 'react-router-dom';
import phonesImg from '../../shared/static/category-phones.png';
import tabletsImg from '../../shared/static/category-tablets.png';
import accImg from '../../shared/static/category-cases.png';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { getAllPhones } from '../../shared/api/phones';

export const CategoriesMenu: React.FC = () => {
  const [phonesCount, setPhonesCount] = useState(0);

  const fetchPhonesCount = async () => {
    try {
      const phones = await getAllPhones();

      setPhonesCount(phones.totalCount);
    } catch (error) {
      throw new Error('Unexpected Error');
    }
  };

  useEffect(() => {
    fetchPhonesCount();
  }, []);

  return (
    <section className="categories_section">
      <SecondaryTitle>
        Shop by category
      </SecondaryTitle>

      <div className="categories_menu">
        <article className="category_item">
          <Link to="/phones" className="category_link">
            <img
              className="category_image"
              src={phonesImg}
              alt="brand new tablets"
            />
          </Link>

          <h3 className="category_title">Mobile Phones</h3>

          <p className="category_desc">
            {`${phonesCount} Models`}
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
