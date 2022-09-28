import {
  Animated,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {withAnchorPoint} from 'react-native-anchor-point';
import Sound from 'react-native-sound';

export default function Metronome() {
  const [bpm, setBpm] = useState<number>(4);
  const interval = useRef(null);
  const [stateRun, setStateRun] = useState<Boolean>(false);
  const [left, setLeft] = useState<Boolean>(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const getTransform = () => {
    let transform = {
      transform: [{perspective: 400}, {rotate: stateRun ? left ? '20deg' : '-20deg' : '0deg'}],
    };
    return withAnchorPoint(transform, {x: 0, y: 1}, {width: 5, height: 150});
  };
  let playNote = new Sound(`beep.wav`, Sound.MAIN_BUNDLE, err => {
    if (err) {
      console.log('ERR===', err);
      return;
    }
  });
  const playSound =() => {
    playNote.play();
  }

  const pressHandle = () => {
    setStateRun(true)
    interval.current = setInterval(() => {
    //   setLeft(!left);
    //   console.log('hehe');
    //   console.log(left)
      playSound()
    }, 500);
  };

  const stop = () => {
    setStateRun(false);
    clearInterval(interval.current);
  };


  return (
    <View style={styles.wraper}>
        {left && <Animated.View style={[styles.blockBlue]} /> }
      
      <TouchableOpacity onPress={pressHandle}>
        <Text>CLICK</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={stop}>
        <Text>Stop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wraper: {
    width: 370,
    height: 200,
    backgroundColor: 'brown',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  blockBlue: {
    width: 10,
    height: 10,
    backgroundColor: '#FFF',
  },
});
