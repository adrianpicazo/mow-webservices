import I18n from "react-native-i18n";
import es from "../i18n/es";

I18n.fallback = true;
I18n.locale = "es";
I18n.translations = {
    es,
};

export class I18nUtils {

    static setLocale(locale) {
        I18n.locale = locale;
    }

    static tr(translationKey: string, ...replaces: string[]): string {
        const translation = I18n.t(translationKey);
        if (replaces && replaces.length !== 0) return require("sprintf-js").sprintf(translation, replaces);
        return translation;
    }
}
