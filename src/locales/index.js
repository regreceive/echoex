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

/**
 * 多国语言导入，因为服务的和浏览器都执行这里，所以分别做了处理
 * @param lang 请求url的参数
 * @param acceptLanguage  请求头部接受的语言
 * @returns {Promise}
 */
const loadLocales = (lang: string, acceptLanguage?: string): Promise => {
  if (lang) {
    // server side
    currentLocale = lang;
  } else if (acceptLanguage) {
    // server side
    const langs = acceptLanguage.split(';');
    currentLocale = langs[0] ? langs[0].split(',')[0] : '';
  } else {
    // browser side
    // 阿里的国际化不能在node上运行
    currentLocale = intl.determineLocale({
      urlLocaleKey: 'lang',
      cookieLocaleKey: 'lang',
    });
  }

  if (!find(SUPPORT_LOCALES, { value: currentLocale })) {
    currentLocale = 'en-US';
  }

  return intl.init({
    currentLocale,
    locales,
  });
};

const mapLocalesName = () => name[currentLocale];

export { loadLocales, mapLocalesName };
