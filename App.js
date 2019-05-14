import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import NoteList from './app/NoteList';
import Login from './app/Login';
import ServerSettings from './app/ServerSettings';
import AuthCheck from './app/AuthCheck';
import { setNavigator } from './helpers/navigation';
import Settings from './lib/Settings';

// Settings.clearAll();

const AppStack = createStackNavigator({
  NoteList,
});

const AuthStack = createStackNavigator({
  Login,
  ServerSettings,
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthCheck,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthCheck',
    },
  ),
);

export default function () {
  return (
    <AppContainer
      ref={(navigatorRef) => {
        setNavigator(navigatorRef);
      }}
    />
  );
}
