// src/track/ga.js
export const pageview = (path) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
};

export const event = (name, params) => {
  if (window.gtag) window.gtag('event', name, params || {});
};
