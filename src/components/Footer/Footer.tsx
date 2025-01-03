import React from 'react';

import css from './Footer.module.css';

import { SOCIAL_NETWORKS } from 'constants/socialNetworks';
import SocialLink from 'components/SocialLink';

const Footer: React.FC = () => {
  const currenYear = new Date().getFullYear();
  return (
    <footer className={css.footer}>
      <p className={css['copyright-text']}>
        &copy; {currenYear}. Bogdan Grynjuk
      </p>

      <ul className={css['social-profiles']}>
        {SOCIAL_NETWORKS.map(({ id, name, url, icon }) => (
          <li key={id}>
            <SocialLink
              href={url}
              name={name}
              icon={icon}
              aria-label={`Link to ${name}`}
            />
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
