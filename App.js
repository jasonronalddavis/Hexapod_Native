import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import BluetoothControl from './src/components/BluetoothControl';

const App = () => {
  return (
    <View style={styles.container}>
      <BluetoothControl />
      <Image
        style={styles.background}
        source={require('./src/Images/background.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

export default App;
