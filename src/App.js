import './config/ReactotronConfig';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Todo from '~/components/Todo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to React Native!</Text>
        <Todo />
      </View>
    );
  }
}
