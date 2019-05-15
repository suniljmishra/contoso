import { Platform } from 'react-native'
import { NativeModules } from 'react-native'
import I18n from 'react-native-i18n'
import en from './en.json'

I18n.fallbacks = true
I18n.translations = {    //Add other language here when and then required
  en
}

if (Platform.OS === 'ios') {
  I18n.locale = NativeModules.SettingsManager.settings.AppleLocale.replace(/_/, '-')
} else if (Platform.OS === 'android') {
  I18n.locale = NativeModules.I18nManager.localeIdentifier.replace(/_/, '-')
}

export default I18n
