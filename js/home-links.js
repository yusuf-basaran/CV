// Eski /#hizmetler adresini yeni çağrı kartına kaydır; ek kimlik oluşturma.
(() => {
  'use strict';
  function scrollToLegacyServices() {
    if (window.location.hash === '#hizmetler') {
      document.getElementById('hizmetler-cta')?.scrollIntoView({ block: 'start' });
    }
  }
  scrollToLegacyServices();
  window.addEventListener('hashchange', scrollToLegacyServices);
})();
