import enUS from './enUS';
import zhCN from './zhCN';
import { getLocale } from '../../../../locales';

export default function() {
  const locale = getLocale();
  return { enUS, zhCN }[locale];
}
