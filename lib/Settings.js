import SensitiveInfo from 'react-native-sensitive-info';

class Settings {
  settings = {}

  defaults = {
    serverUrl: 'https://skygard.io',
    clientId: 'aa4389b0-c5c4-49ea-91d1-6b7508fd6f21',
    accessToken: null,
    refreshToken: null,
    accessTokenExpires: null,
  }

  constructor() {
    this.sync();
  }

  get(item, withDefault = true) {
    const setting = this.settings[item];

    if (!setting && withDefault) {
      return this.defaults[item];
    }

    return setting;
  }

  set(item, value) {
    this.settings[item] = value;

    this.saveSettings();
  }

  async sync() {
    try {
      this.settings = JSON.parse(
        await SensitiveInfo.getItem('settings', {}),
      );
    } catch (error) {
      this.settings = {};

      SensitiveInfo.deleteItem('setings', {});
    }
  }

  saveSettings() {
    SensitiveInfo.setItem('settings', JSON.stringify(this.settings), {});
  }

  clearAll() {
    this.settings = {};

    this.saveSettings();
  }

  getAll(withDefaults = true) {
    const defaults = withDefaults ? this.getDefaults() : {};

    return {
      ...defaults,
      ...this.settings,
    };
  }

  getDefaults(withValues = true) {
    const defaults = { ...this.defaults };

    if (withValues) {
      return defaults;
    }

    defaults.keys().forEach((key) => {
      defaults[key] = null;
    });

    return defaults;
  }

  getDefault(item) {
    return this.getDefaults()[item];
  }
}

const instance = new Settings();

export default instance;
