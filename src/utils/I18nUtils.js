import _ from 'lodash';
import I18n, { getLanguages } from 'react-native-i18n';
import es from '../i18n/es';
import en from '../i18n/en';
import {
    TR_LANGUAGE_ENGLISH,
    TR_LANGUAGE_SPANISH
} from '../i18n/constants';

I18n.fallback = true;
I18n.locale = '';
I18n.translations = { es, en };

export class I18nUtils {

    static setDeviceLocale() {
        getLanguages().then(languages => {
            const languageCodes = _.map(languages, language => language.substring(0, 2));
            const deviceLanguageCode = _.find(languageCodes,
                    languageCode => languageCode in I18n.translations);
            I18n.locale = deviceLanguageCode || 'en';
        });
    }

    static setLocale(locale) {
        I18n.locale = locale;
    }

    static getLanguage() {
        return I18n.locale;
    }

    static tr(translationKey, ...replaces) {
        const translation = I18n.t(translationKey);

        if (replaces && replaces.length !== 0)
            return require('sprintf-js').sprintf(translation, replaces);
        return translation;
    }

    static getLanguageName(languageCode) {
        switch (languageCode) {
            case 'es':
                return I18nUtils.tr(TR_LANGUAGE_SPANISH);
            case 'en':
                return I18nUtils.tr(TR_LANGUAGE_ENGLISH);
            default:
                return null;
        }
    }
}
