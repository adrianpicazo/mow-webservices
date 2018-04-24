import I18n from 'react-native-i18n';
import es from '../i18n/es';
import en from '../i18n/en';

I18n.fallback = true;
I18n.locale = 'en';
I18n.translations = { es, en };

export class I18nUtils {

    static setLocale(locale) {
        I18n.locale = locale;
    }

    static tr(translationKey, ...replaces) {
        const translation = I18n.t(translationKey);

        if (replaces && replaces.length !== 0)
            return require('sprintf-js').sprintf(translation, replaces);
        return translation;
    }
}
