// fix browser land
import 'babel-polyfill'
// local imports
import settings from 'config/settings'


// apply global styles (order is important here!)
import 'styles/css/normalize.css'
import 'styles/css/main.css'


// Google Analytics
// see: https://developers.google.com/analytics/devguides/collection/analyticsjs/
/* eslint-disable */
window.ga = window.ga || function () {
    (ga.q = ga.q || []).push(arguments)
};
ga.l = +new Date;
ga('create', settings.gaPropertyId, 'auto');
/* eslint-enable */
