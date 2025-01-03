import gitHubIcon from 'assets/icons/github_icon.svg';
import telegramIcon from 'assets/icons/telegram_icon.svg';
import linkedInIcon from 'assets/icons/linkedin_icon.svg';

interface SocialNetwork {
  id: number;
  name: 'linkedin' | 'gitHub' | 'telegram';
  url: string;
  icon: string;
}

export const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    id: 1,
    name: 'linkedin',
    url: 'http://linkedin.com/in/bogdan-grynjuk-7024a710a/',
    icon: linkedInIcon,
  },
  {
    id: 2,
    name: 'gitHub',
    url: 'https://github.com/BogdanGrynjuk',
    icon: gitHubIcon,
  },
  {
    id: 3,
    name: 'telegram',
    url: 'https://t.me/bogdan_grynjuk',
    icon: telegramIcon,
  },
];
