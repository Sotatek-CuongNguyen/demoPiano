import React, {useState, type PropsWithChildren} from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Octave from './src/components/Octave';
import {notes} from './src/utils/helpers';
import Sound from 'react-native-sound';
import Piano from './src/Piano/Piano';
import MidiNumbers from './src/Piano/MidiNumbers';
// import Slider from '@react-native-community/slider';
import styled from 'styled-components/native';
import Notes from './src/components/PianoComponents/Note';
import {Slider, Icon, Image} from '@rneui/themed';
import Metronome from './src/components/Metronome';
import AutoScrolling from './src/components/AutoScrolling';
const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};
const firstNote = MidiNumbers.fromNote('c4');
const lastNote = MidiNumbers.fromNote('e5');
const Wraprer = styled.ScrollView`
  height: 302px;
  width: 400px;
  margin: 10px auto;
  padding: 20px 0 0 20px;
  position: relative;
  /* border: 1px solid #160801; */
  border-radius: 16px;
  flex-direction: row;
  /* background-color: #833007; */
  overflow: hidden;
`;
const Box = styled.View `
    width: 70px;
    height: 40px;
    background-color: #eee;
    border: 1px solid white;
    margin-top: -15px;

   padding: 0 10px
`;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [music, setMusic] = useState(null);
  const [position, setPosition] = useState<number>(0);
  const interpolate = (start: number, end: number) => {
    let k = (position - 0) / 10; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };
  console.log(position)
  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };
  const pressHandle = note => {
    let playNote = new Sound(`${note}.mp3`, Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log('ERR===', err);
        return;
      }
      playNote.play(success => {
        console.log('Playing success', success);
        console.log(note);
        playNote.release();
      });
    });
    console.log('PLAYNOTE', playNote);
  };
/* METRONOME */
 //play with 80 bpm

/* END */
  return (
    <View>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AutoScrolling />
      
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '500',
  },
  wraper: {
    backgroundColor: '#7c7373',
  },
  slider: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft:10,
    position: 'relative',
    marginRight: 10,
    width: 290
  },
  box: {
    width: 70,
    height: 10,
    borderWidth: 2, 
    borderColor: '#fff',
    backgroundColor: '#eee',
    position: 'absolute',
    paddingBottom: 10,
    paddingTop: 10,
  },
});

export default App;
