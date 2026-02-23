/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'WhatsApp Link Helper',
  titleTemplate: '%s | WhatsApp Link Helper',
  defaultTitle: 'WhatsApp Link Helper',
  description: 'WhatsApp Link Helper / Generator',
  canonical: 'https://wa.sznm.dev',
  openGraph: {
    url: 'https://wa.sznm.dev',
    title: 'wa-link-helper',
    description: 'WhatsApp Link Helper / Generator',
    images: [
      {
        url: 'https://og.sznm.dev/api/generate?heading=WhatsApp%20Link%20Helper&text=https://wa.sznm.dev',
        alt: 'WhatsApp Link Helper og-image',
      },
    ],
    site_name: 'WhatsApp Link Helper',
  },
  twitter: {
    handle: '@sozonome',
    cardType: 'summary_large_image',
  },
};

export default defaultSEOConfig;
