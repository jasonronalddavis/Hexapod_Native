// BluetoothController.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BluetoothService from '../services/BluetoothService';
import HexapodControl from '../components/HexapodControl';

const BluetoothController = () => {
  const [device, setDevice] = useState(null);
  const [connected, setConnected] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const handleBluetoothConnect = async () => {
    console.log('Handling Bluetooth connection...');
    try {
      const bluetoothDevice = await BluetoothService.connect();
      setDevice(bluetoothDevice);
      setConnected(true);
      BluetoothService.subscribeToCharacteristic(bluetoothDevice, handleCharacteristicChange);
    } catch (error) {
      console.error('Bluetooth connection failed:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (connected) {
        BluetoothService.disconnect(device);
        setConnected(false);
      }
    };
  }, [connected, device]);

  const handleCharacteristicChange = (event) => {
    const receivedValue = event.target.value;
    if (receivedValue === 'crawl_forward') {
      setIsMoving(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bluetooth}>
        <HexapodControl device={device} />
      </View>
      <View style={styles.connect}>
        <Text>Connecting to Hexapod...</Text>
        <Button title="Connect Bluetooth" onPress={handleBluetoothConnect} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  bluetooth: {
    flex: 1,
  },
  connect: {
    minHeight: 100,
    position: 'absolute',
    fontSize: 20,
    left: 250, // Adjust as needed to nudge left
    top: -45,
    zIndex: 50,
    color: 'rgb(255, 255, 255)',
  },
});

export default BluetoothController;
