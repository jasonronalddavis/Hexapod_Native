import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, Text, TouchableOpacity, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BluetoothControl = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  useEffect(() => {
    BleManager.start({ showAlert: false });

    const handleDiscoverPeripheral = (peripheral) => {
      if (!devices.find(device => device.id === peripheral.id)) {
        setDevices(prevDevices => [...prevDevices, peripheral]);
      }
    };

    BleManager.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

    return () => {
      BleManager.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
    };
  }, [devices]);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true).then(() => {
        setIsScanning(true);
      }).catch(err => {
        console.error(err);
      });
    }
  };

  const stopScan = () => {
    BleManager.stopScan().then(() => {
      setIsScanning(false);
    }).catch(err => {
      console.error(err);
    });
  };

  const connectDevice = (device) => {
    BleManager.connect(device.id).then(() => {
      setConnectedDevice(device);
      console.log(`Connected to ${device.name}`);
    }).catch(err => {
      console.error(err);
    });
  };

  const disconnectDevice = () => {
    if (connectedDevice) {
      BleManager.disconnect(connectedDevice.id).then(() => {
        setConnectedDevice(null);
        console.log('Disconnected');
      }).catch(err => {
        console.error(err);
      });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => connectDevice(item)} style={styles.device}>
      <Text>{item.name || 'Unnamed device'}</Text>
      <Text>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title={isScanning ? 'Scanning...' : 'Start Scan'} onPress={startScan} />
      {connectedDevice ? (
        <Button title="Disconnect" onPress={disconnectDevice} />
      ) : (
        <FlatList
          data={devices}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text>No devices found</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  device: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default BluetoothControl;
