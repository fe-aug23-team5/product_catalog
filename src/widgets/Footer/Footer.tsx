import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../shared/static/logo.svg';
import upArrow from '../../shared/static/icons/up-arrow-black.svg';
import styles from './Footer.module.scss';
import { ModalWindow } from '../../features/ModalWindow';
import teamData from '../../shared/static/team';
import githubSvg from '../../shared/static/icons/github.svg';
import linkedinSvg from '../../shared/static/icons/linkedIn.svg';
import { removeScrollForBody } from '../../shared/helpers/removeScrollForBody';
import { scrollToTop } from '../../shared/helpers/scrollFunct';

enum NavTitle {
  GITHUB = 'github',
  CONTACTS = 'contacts',
  RIGHTS = 'rights',
}

export const Footer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    removeScrollForBody(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    removeScrollForBody(false);
    setIsModalOpen(false);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a className={styles.logo} href="/">
          <img
            className={styles.logo__icon}
            src={logo}
            alt="Nice Gadgets logo"
          />
        </a>

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={styles.nav__item}>
              <a
                href="https://github.com/fe-aug23-team5/product_catalog"
                className={styles.nav__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {NavTitle.GITHUB}
              </a>
            </li>

            <li className={styles.nav__item}>
              <button
                type="button"
                className={styles.nav__link}
                onClick={handleModalOpen}
              >
                {NavTitle.CONTACTS}
              </button>
            </li>

            <li className={styles.nav__item}>
              <Link
                className={styles.nav__link}
                to={`/${NavTitle.RIGHTS.toLowerCase()}`}
              >
                {NavTitle.RIGHTS}
              </Link>
            </li>
          </ul>
        </nav>

        {isModalOpen && (
          <ModalWindow onClose={closeModal}>
            <div className={styles.modal__container}>
              <ul className={styles.modalBody}>
                {teamData.map((person) => (
                  <li key={person.id} className={styles.person__card}>
                    <img
                      src={person.photo}
                      alt={person.name}
                      className={styles.person__photo}
                    />

                    <p className={styles.person__name}>{person.name}</p>

                    <ul className={styles.social__list}>
                      <li className={styles.social__item}>
                        <a
                          href={person.links.github}
                          className={styles.social__link}
                          aria-label="github link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            className={styles.social__icon}
                            src={githubSvg}
                            alt="GitHub Icon"
                          />
                        </a>
                      </li>
                      <li className={styles.social__item}>
                        <a
                          href={person.links.linkedin}
                          className={styles.social__link}
                          aria-label="linkedin link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            className={styles.social__icon}
                            src={linkedinSvg}
                            alt="Linkedin Icon"
                          />
                        </a>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </ModalWindow>
        )}

        <div className={styles.back_to_top}>
          <p className={styles.back_to_top__discription}>Back to top</p>

          <button
            className={styles.back_to_top__icon}
            type="button"
            onClick={scrollToTop}
          >
            <img
              className={styles.footer__icon}
              src={upArrow}
              alt="Back to top button"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
