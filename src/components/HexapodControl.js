import React, { useState } from 'react';
import { View, Button, StyleSheet, Image, PanResponder, TouchableOpacity } from 'react-native';
import BluetoothService from '../services/BluetoothService';
import eyeBar from './Images/eyeBar.png';
import eyeBarCopy from './Images/eyeBarCopy.png';
import eyeWindow from './Images/eyeWindow.png';
import FrontEyeBar from './Images/FrontEyeBar.png';
import mouthWindow from './Images/mouthWindow.png';
import crawl_forward from './Images/crawl_forward.png';
import crawl_backward from './Images/crawl_backward.png';
import crawl_right from './Images/crawl_right.png';
import crawl_left from './Images/crawl_left.png';
import stand_image from './Images/stand.png';
import squat_down from './Images/squat_down.png';
import body_window from './Images/body_window.png';
import blink_button from './Images/blink_button.png';
import mouth from './Images/mouth.png';
import stretch_image from './Images/stretch_image.png';

const HexapodControl = ({ device }) => {
  const [width, setWidth] = useState(140);
  const [height, setHeight] = useState(100);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);

  const startCrawl = (direction) => {
    if (device) {
      BluetoothService.sendCommand(device, direction);
    }
  };

  const stopCrawl = (direction) => {
    if (device) {
      BluetoothService.sendCommand(device, `${direction}0`);
    }
  };

  const handleLeftStart = () => {
    console.log('Crawling left...');
    startCrawl('L');
  };

  const handleLeftStop = () => {
    console.log('Stopping crawl left...');
    stopCrawl('L');
  };

  const handleRightStart = () => {
    console.log('Crawling right...');
    startCrawl('R');
  };

  const handleRightStop = () => {
    console.log('Stopping crawl right...');
    stopCrawl('R');
  };

  const handleBackStart = () => {
    console.log('Crawling backward...');
    startCrawl('Z');
  };

  const handleBackStop = () => {
    console.log('Stopping crawl backward...');
    stopCrawl('Z');
  };

  const handleForwardStart = () => {
    console.log('Crawling forward...');
    startCrawl('F');
  };

  const handleForwardStop = () => {
    console.log('Stopping crawl forward...');
    stopCrawl('F');
  };

  const handleStretch = () => {
    console.log('Stretching...');
    if (device) {
      BluetoothService.sendCommand(device, 'S');
    }
  };

  const handleMouseUp = () => {
    console.log('Mouse released - executing lift and stretch...');
    if (device) {
      BluetoothService.sendCommand(device, 'U');
      setTimeout(() => {
        BluetoothService.sendCommand(device, 'S');
      }, 500);
    }
  };

  const standLift = () => {
    console.log('Lifting and standing...');
    if (device) {
      BluetoothService.sendCommand(device, 'U');
    }
  };

  const standUp = () => {
    console.log('Standing...');
    if (device) {
      BluetoothService.sendCommand(device, 'T');
    }
  };

  const mouthDown = () => {
    console.log('Mouth down...');
    if (device) {
      BluetoothService.sendCommand(device, 'L20');
    }
  };

  const mouthUp = () => {
    console.log('Mouth up...');
    if (device) {
      BluetoothService.sendCommand(device, 'L21');
    }
  };

  const handleBend = () => {
    console.log('Bending...');
    if (device) {
      BluetoothService.sendCommand(device, 'B');
    }
  };

  const handleBlink = () => {
    console.log('Blinking...');
    if (device) {
      BluetoothService.sendCommand(device, 'd');
    }
  };

  const xBarDown = (e) => {
    setDragging(true);
    setStartX(e.nativeEvent.pageX);
  };

  const xBarMove = (e) => {
    if (dragging) {
      const deltaX = e.nativeEvent.pageX - startX;
      const newWidth = width + deltaX;
      const clampedWidth = Math.min(Math.max(newWidth, 20), 160);
      setWidth(clampedWidth);
      if (device) {
        BluetoothService.sendCommand(device, `x${clampedWidth}`);
      }
      setStartX(e.nativeEvent.pageX);
    }
  };

  const xBarUp = () => {
    setDragging(false);
  };

  const yBarDown = (e) => {
    setDragging(true);
    setStartY(e.nativeEvent.pageY);
  };

  const yBarMove = (e) => {
    if (dragging) {
      const deltaY = e.nativeEvent.pageY - startY;
      const newHeight = height + deltaY;
      const clampedHeight = Math.min(Math.max(newHeight, 20), 160);
      setHeight(clampedHeight);
      if (device) {
        BluetoothService.sendCommand(device, `y${clampedHeight}`);
      }
      setStartY(e.nativeEvent.pageY);
    }
  };

  const yBarUp = () => {
    setDragging(false);
  };

  return (
    <View style={styles.container}>
      <Image source={eyeWindow} style={styles.image} />
      <Image source={mouthWindow} style={styles.image} />
      <Image source={FrontEyeBar} style={styles.image} />
      <View
        style={[styles.rectangle, { width }]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={xBarDown}
        onResponderMove={xBarMove}
        onResponderRelease={xBarUp}
      >
        <Image source={eyeBar} style={styles.rectangleImage} />
      </View>
      <View
        style={[styles.yRectangle, { height }]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={yBarDown}
        onResponderMove={yBarMove}
        onResponderRelease={yBarUp}
      >
        <Image source={eyeBarCopy} style={styles.rectangleImage} />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPressIn={handleBackStart} onPressOut={handleBackStop}>
          <Image source={crawl_backward} style={styles.crawlImage} />
        </TouchableOpacity>
        <TouchableOpacity onPressIn={handleForwardStart} onPressOut={handleForwardStop}>
          <Image source={crawl_forward} style={styles.crawlImage} />
        </TouchableOpacity>
        <TouchableOpacity onPressIn={handleRightStart} onPressOut={handleRightStop}>
          <Image source={crawl_right} style={styles.crawlImage} />
        </TouchableOpacity>
        <TouchableOpacity onPressIn={handleLeftStart} onPressOut={handleLeftStop}>
          <Image source={crawl_left} style={styles.crawlImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.bend}>
        <TouchableOpacity onPressIn={handleBend} onPressOut={handleMouseUp}>
          <Image source={squat_down} style={styles.bendButton} />
        </TouchableOpacity>
        <TouchableOpacity onPressIn={standLift} onPressOut={standUp}>
          <Image source={stand_image} style={styles.standButton} />
        </TouchableOpacity>
        <TouchableOpacity onPressIn={mouthDown} onPressOut={mouthUp}>
          <Image source={mouth} style={styles.mouthButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStretch}>
          <Image source={stretch_image} style={styles.stretchImage} />
        </TouchableOpacity>
      </View>
      <Image source={body_window} style={styles.bodyWindow} />
      <TouchableOpacity onPress={handleBlink}>
        <Image source={blink_button} style={styles.blinkButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  rectangle: {
    position: 'absolute',
    height: 20,
    zIndex: 85,
  },
  rectangleImage: {
    width: '100%',
    height: '100%',
  },
  yRectangle: {
    position: 'absolute',
    transform: [{ rotate: '180deg' }],
    zIndex: 80,
    width: 22,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    zIndex: 60,
  },
  bend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    zIndex: 140,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  crawlImage: {
    width: 70,
    height: 70,
  },
  standButton: {
    color: 'none',
    border: 'none',
    background: 'none',zIndex: 90,
    position: 'absolute',
    top: 470,
    right: 450,
    height: 130,
  },
  bendButton: {
    color: 'none',
    border: 'none',
    background: 'none',
    zIndex: 140,
    position: 'absolute',
    top: 550,
    right: 420,
    height: 130,
  },
  mouthButton: {
    color: 'none',
    border: 'none',
    background: 'none',
    position: 'absolute',
    right: 230,
    top: 930,
    zIndex: 55,
    height: 100,
  },
  mouthButtonHover: {
    height: 105,
  },
  stretchImage: {
    color: 'none',
    border: 'none',
    background: 'none',
    zIndex: 140,
    position: 'absolute',
    right: 50,
    top: 555,
    height: 100,
  },
  stretchImageHover: {
    height: 110,
  },
  blinkButton: {
    color: 'none',
    border: 'none',
    background: 'none',
    zIndex: 110,
    position: 'absolute',
    right: 30,
    top: -235,
    height: 85,
  },
  blinkButtonHover: {
    height: 90,
  },
  bodyWindow: {
    color: 'none',
    border: 'none',
    background: 'none',
    zIndex: 150,
    position: 'absolute',
    right: 220,
    top: 280,
    height: 250,
  },
});

export default HexapodControl;