export const SITE = {
  name: 'Virginia Ory',
  title: 'Virginia Ory',
  description:
    'Virginia Ory is a Brazilian illustrator based in Porto, Portugal. Picture books, characters, typography and lettering.',
  keywords: 'illustration,illustrator,picture books,kids illustration,lettering,typography,Porto',
  email: 'oi@virginiaory.com',
  lang: 'en',
};

export const NAV = [
  { href: '/about-me', label: 'About me' },
  { href: '/', label: 'Illustration' },
  { href: '/contact', label: 'Contact' },
];

/**
 * Contact form endpoint. The form posts to Web3Forms (free, no backend):
 * create an access key at https://web3forms.com with oi@virginiaory.com and
 * set PUBLIC_WEB3FORMS_KEY in the hosting environment. Without a key the form
 * falls back to opening the visitor's mail app.
 */
export const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined;
