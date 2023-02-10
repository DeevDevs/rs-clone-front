import { DevelopersNames, FooterImgAlts, Links } from '../../enums';
import gitLogo from '../../assets/svg/gitLogo.svg';
import rsLogo from '../../assets/svg/rsLogo.svg';
import logoImg from '../../assets/svg/logo.svg';

const FooterStore = {
  logo: {
    src: logoImg,
    alt: FooterImgAlts.Logo,
  },
  rsLink: {
    to: Links.Rs,
    imgSrc: rsLogo,
    imgAlt: FooterImgAlts.RsLogo,
  },
  gitLinks: [
    {
      to: Links.Vnuchkov,
      imgSrc: gitLogo,
      imgAlt: FooterImgAlts.GitLogo,
      spanText: DevelopersNames.Vnuchkov,
    },
    {
      to: Links.Kazakov,
      imgSrc: gitLogo,
      imgAlt: FooterImgAlts.GitLogo,
      spanText: DevelopersNames.Kazakov,
    },
    {
      to: Links.Luferov,
      imgSrc: gitLogo,
      imgAlt: FooterImgAlts.GitLogo,
      spanText: DevelopersNames.Luferov,
    },
  ],
};

export default FooterStore;
