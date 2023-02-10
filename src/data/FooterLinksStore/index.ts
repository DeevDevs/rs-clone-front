import {
  DevelopersNames, FooterImgAlts, GitLinksKeys, Links,
} from '../../enums';
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
      key: GitLinksKeys.GitLink1,
    },
    {
      to: Links.Kazakov,
      imgSrc: gitLogo,
      imgAlt: FooterImgAlts.GitLogo,
      spanText: DevelopersNames.Kazakov,
      key: GitLinksKeys.GitLink2,
    },
    {
      to: Links.Luferov,
      imgSrc: gitLogo,
      imgAlt: FooterImgAlts.GitLogo,
      spanText: DevelopersNames.Luferov,
      key: GitLinksKeys.GitLink3,
    },
  ],
};

export default FooterStore;
