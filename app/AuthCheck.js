import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import SkygardServer from '../lib/SkygardServer';

export default class AuthCheck extends React.Component {
  constructor(props) {
    super(props);

    this.checkAuth();
  }

  async checkAuth() {
    const hasAccessToken = await SkygardServer.hasAccessToken();
    const { navigation } = this.props;

    navigation.navigate(hasAccessToken ? 'App' : 'Auth');
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}
