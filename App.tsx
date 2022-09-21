import React, {useState, type PropsWithChildren} from 'react';
import {
    ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Octave from './src/components/Octave';
import {notes} from './src/utils/helpers';
import Sound from 'react-native-sound';
import Piano from './src/Piano/Piano';
import MidiNumbers from './src/Piano/MidiNumbers';
import Slider from '@react-native-community/slider';

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

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [music, setMusic] = useState(null);
  const [position, setPosition] = useState<number>(0)
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
const image = {uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Froyalty-free-stock-photos-piano-keyboard-image18830568&psig=AOvVaw0XfVOdi52kbnxIlYs1NLv7&ust=1663819602616000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDSj5aBpfoCFQAAAAAdAAAAABAD"}

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ImageBackground source={image}   resizeMode="cover">
      <Slider
        style={{width: 400, height: 40, backgroundColor: '#EEEEEE'}}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#EEEEEE"
        maximumTrackTintColor="#EEEEEE"
        thumbImage={{
            uri: 'https://img.icons8.com/windows/50/000000/bus.png',
          }}
          trackImage={{
            uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Froyalty-free-stock-photos-piano-keyboard-image18830568&psig=AOvVaw0XfVOdi52kbnxIlYs1NLv7&ust=1663819602616000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJDSj5aBpfoCFQAAAAAdAAAAABAD',
          }}
          value={0}
        //   onSlidingComplete={value => {
           
          
        //   }}
          onValueChange={value => {
            setPosition(value)
            console.log(value)
          }}
          step={1}
        
      />
      </ImageBackground>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Octave notes={notes} pressHandle={pressHandle} position={position} />
      </ScrollView>
      {/* <Piano noteRange={{first: firstNote, last: lastNote}} width={300} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
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
  image: {
    flex: 1,
    justifyContent: "center",
    height: 40,
    width: 500
  },
});

export default App;
