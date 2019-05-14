import { authorize } from 'react-native-app-auth';
import { navigate } from '../helpers/navigation';
import Settings from './Settings';

class SkygardServer {
  hasAccessToken() {
    return Settings.get('accessToken');
  }

  async authenticate() {
    // Log in to get an authentication token
    const response = await authorize({
      clientId: Settings.get('clientId'),
      redirectUrl: 'io.skygard.notes://',
      scopes: [],
      serviceConfiguration: {
        authorizationEndpoint: `${Settings.get('serverUrl')}/oauth/authorize`,
        tokenEndpoint: `${Settings.get('serverUrl')}/oauth/token`,
      },
      useNonce: false,
      usePKCE: true,
    });

    if (response.accessToken) {
      Settings.set('accessToken', response.accessToken);
      Settings.set('refreshToken', response.refreshToken);
      Settings.set('accessTokenExpires', response.accessTokenExpirationDate);

      navigate('App');
    } else {
      throw new Error('Unknown authentication error occurred');
    }
  }
}

const instance = new SkygardServer();

export default instance;
