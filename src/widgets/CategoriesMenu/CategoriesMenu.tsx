import React, { useEffect, useState } from 'react';
import './CategiesMenu.scss';
import { Link } from 'react-router-dom';
import phonesImg from '../../shared/static/category-phones.png';
import tabletsImg from '../../shared/static/category-tablets.png';
import accImg from '../../shared/static/category-cases.png';
import { SecondaryTitle } from '../../shared/ui/SecondaryTitle';
import { getAllPhones } from '../../shared/api/phones';
import { getAllTablets } from '../../shared/api/tablets';
import { getAllAcc } from '../../shared/api/accessories';
import { scrollToTop } from '../../shared/helpers/scrollFunct';

export const CategoriesMenu: React.FC = () => {
  const [phonesCount, setPhonesCount] = useState(0);
  const [tabletsCount, setTabletsCount] = useState(0);
  const [accCount, setAccCount] = useState(0);

  const fetchPhonesCount = async () => {
    try {
      const phones = await getAllPhones();
      const tablets = await getAllTablets();
      const accessories = await getAllAcc();

      setPhonesCount(phones.totalCount);
      setTabletsCount(tablets.totalCount);
      setAccCount(accessories.totalCount);
    } catch (error) {
      throw new Error('Unexpected Error');
    }
  };

  useEffect(() => {
    fetchPhonesCount();
  }, []);

  return (
    <section className="categories_section">
      <div className="categories_title">
        <SecondaryTitle>
          Shop by category
        </SecondaryTitle>
      </div>

      <div className="categories_menu">
        <article className="category_item">
          <Link
            to="/phones"
            className="category_link"
            onClick={scrollToTop}
          >
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
          <Link
            to="/tablets"
            className="category_link"
            onClick={scrollToTop}
          >
            <img
              className="category_image"
              src={tabletsImg}
              alt="brand new tablets"
            />
          </Link>

          <h3 className="category_title">Tablets</h3>

          <p className="category_desc">
            {`${tabletsCount} Models`}
          </p>
        </article>

        <article className="category_item">
          <Link
            to="/accessories"
            className="category_link"
            onClick={scrollToTop}
          >
            <img
              className="category_image"
              src={accImg}
              alt="brand new phone cases"
            />
          </Link>

          <h3 className="category_title">Accessories</h3>

          <h4 className="category_desc">
            {`${accCount} Models`}
          </h4>
        </article>
      </div>
    </section>
  );
};
