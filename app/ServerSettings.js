import React, { Component } from 'react';
import { View } from 'react-native';
import { List, InputItem } from '@ant-design/react-native';
import Settings from '../lib/Settings';

export default class ServerSetings extends Component {
  static navigationOptions = {
    title: 'Server Settings'
  }

  constructor(props) {
    super(props);

    this.createState();
    this.syncState();

    this.setServerUrl = this.setServerUrl.bind(this);
    this.setClientId = this.setClientId.bind(this);
  }

  setServerUrl(serverUrl) {
    Settings.set('serverUrl', serverUrl);

    this.setState({
      serverUrl
    });
  }

  setClientId(clientId) {
    Settings.set('clientId', clientId);

    this.setState({
      clientId
    });
  }

  createState() {
    this.state = Settings.getDefaults(false);
  }

  async syncState() {
    this.setState(await Settings.getAll(false));
  }

  render() {
    const { serverUrl, clientId } = this.state;

    return (
      <View>
        <List renderHeader="Server URL">
          <InputItem
            value={serverUrl}
            onChange={this.setServerUrl}
            placeholder={Settings.getDefault('serverUrl')}
          />
        </List>

        <List renderHeader="Client ID">
          <InputItem
            value={clientId}
            onChange={this.setClientId}
            placeholder={Settings.getDefault('clientId')}
          />
        </List>
      </View>
    );
  }
}
