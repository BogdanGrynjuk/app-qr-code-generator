import React from 'react';

import css from './SocialLink.module.css';

interface Props {
  href: string;
  icon: string;
  name: string;
}

const SocialLink: React.FC<Props> = ({ href, icon, name }) => {
  return (
    <a
      className={css.link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
    >
      <img className={css.icon} src={icon} alt={name} />
    </a>
  );
};

export default SocialLink;
