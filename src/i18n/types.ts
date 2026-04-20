export interface Translations {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
    ogImageAlt: string;
  };
  nav: {
    donate: string;
    langSwitchLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleItalic: string;
    subtitle: string;
    subtitleAccent: string;
    /** Text appended after the accent span — e.g. ". Ahlen gestalten." for DE, "" for TR */
    subtitleSuffix: string;
    cta: string;
    ctaSecondary: string;
    thumbExteriorAlt: string;
    thumbFacadeAlt: string;
    /** aria-label for the lightbox close button */
    lightboxClose: string;
  };
  projectIntro: {
    label: string;
    heading: string;
    leftColumn: Array<{
      title: string;
      body: string;
    }>;
    rightColumn: Array<{
      title: string;
      body: string;
    }>;
  };
  vision: {
    label: string;
    heading: string;
    /** Short paragraph below the heading */
    subheading: string;
    /** Mobile swipe hint label */
    swipeHint: string;
    /** aria-label for the "previous card" button */
    prevCard: string;
    /** aria-label for the "next card" button */
    nextCard: string;
    cards: Array<{
      title: string;
      body: string;
    }>;
  };
  gallery: {
    label: string;
    heading: string;
    /** aria-label for the video play button */
    videoPlay: string;
    /** aria-label for the video pause button */
    videoPause: string;
    images: Array<{
      alt: string;
    }>;
  };
  donation: {
    label: string;
    heading: string;
    /** Short paragraph below the heading */
    subheading: string;
    /** "Fortschritt" / "İlerleme" — progress bar label */
    progressLabel: string;
    /** "Ziel" / "Hedef" — shown before goal amount */
    goalLabel: string;
    ctaPaypal: string;
    anonNote: string;
    /** alt text for the PayPal QR-code image */
    qrAlt: string;
    bankLabel: string;
    bankName: string;
    recipient: string;
    purpose: string;
    ibanLabel: string;
    bicLabel: string;
  };
  companySupport: {
    label: string;
    heading: string;
    body: string;
    cta: string;
    options: Array<{
      title: string;
      description: string;
    }>;
  };
  mapSection: {
    label: string;
    heading: string;
    body: string;
    siteLabel: string;
    siteName: string;
    coordinatesLabel: string;
    decimalLabel: string;
    primaryCta: string;
    statusBadge: string;
    contextBadge: string;
    liveBadge: string;
    fallbackBadge: string;
    fallbackNote: string;
    loadingLabel: string;
  };
  social: {
    label: string;
    heading: string;
    cta: string;
  };
  finalCta: {
    heading: string;
    /** Short paragraph below the heading */
    body: string;
    cta: string;
  };
  partners: {
    label: string;
    heading: string;
    mainRole1: string;
    mainRole2: string;
    partnerRole: string;
    projectPartnerRole: string;
  };
  pdf: {
    label: string;
    heading: string;
    openLabel: string;
    linkAriaLabel: string;
  };
  footer: {
    copyright: string;
    impressum: string;
    datenschutz: string;
    kontakt: string;
    madeBy: string;
  };
  cookie: {
    bannerTitle: string;
    bannerText: string;
    acceptAll: string;
    rejectAll: string;
    settings: string;
    modalTitle: string;
    modalDescription: string;
    closeSettings: string;
    alwaysActive: string;
    external: string;
    saveSelection: string;
    openSettingsAriaLabel: string;
    openSettingsTitle: string;
    categories: {
      necessary: {
        label: string;
        description: string;
        details: string;
      };
      analytics: {
        label: string;
        description: string;
        details: string;
      };
      external: {
        label: string;
        description: string;
        details: string;
      };
    };
  };
  stickyBar: {
    cta: string;
  };
  landscape: {
    text: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  seoText: {
    organizationDescription: string;
    websiteDescription: string;
    webpageName: string;
    webpageDescription: string;
  };
}
