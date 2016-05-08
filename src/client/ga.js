// local imports
import settings from 'config/settings'


// Google Analytics
// see: https://developers.google.com/analytics/devguides/collection/analyticsjs/
/* eslint-disable */
window.ga = window.ga || function () {
    (ga.q = ga.q || []).push(arguments)
};
ga.l = +new Date;
ga('create', settings.gaPropertyId, 'auto');
/* eslint-enable */
