import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from '@ant-design/react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconOutline } from '@ant-design/icons-react-native';
import SkygardServer from '../lib/SkygardServer';

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('ServerSettings')}>
        <IconOutline name="setting" />
      </TouchableOpacity>
    )
  })

  state = {
    loggingIn: false
  }

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  async login() {
    try {
      this.setState({
        loggingIn: true
      });

      await SkygardServer.authenticate();
    } catch (error) {
      this.setState({
        loggingIn: false
      });
    }
  }

  render() {
    const { loggingIn } = this.state;

    return (
      <View>
        <Button onPress={this.login} type="primary" loading={loggingIn}>Login</Button>
      </View>
    );
  }
}
