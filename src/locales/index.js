// @flow

import intl from 'react-intl-universal';
import find from 'lodash/find';

let currentLocale = 'en-US';

const SUPPORT_LOCALES = [
  {
    name: 'English',
    value: 'en-US',
  },
  {
    name: '中文',
    value: 'zh-CN',
  },
];

const locales = {
  'en-US': require('./en-US.js').default,
  'zh-CN': require('./zh-CN.js').default,
};

const name = {
  'en-US': 'English',
  'zh-CN': '中文',
};

const loadLocales = (): Promise => {
  currentLocale = intl.determineLocale({
    urlLocaleKey: 'lang',
    cookieLocaleKey: 'lang',
  });

  if (!find(SUPPORT_LOCALES, { value: currentLocale })) {
    currentLocale = 'en-US';
  }

  return intl.init({
    currentLocale,
    locales,
  });
};

const mapLocalesName = () => {
  return name[currentLocale];
};

export { loadLocales, mapLocalesName };
