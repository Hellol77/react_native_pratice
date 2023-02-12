/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {View, Text, StyleSheet, StatusBar} from 'react-native';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text>Seoul</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default App;
