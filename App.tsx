import React, {useCallback, useState, type PropsWithChildren} from 'react';
import {
  Dimensions,
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
import ImagePicker from 'react-native-image-crop-picker';
import DragAndDrop from './src/components/DragAndDrop';
import Gestures from 'react-native-easy-gestures-new';
import Horizontal from './src/components/DraList';
import DraList from './src/components/DraList';


const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
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
const Box = styled.View`
  width: 70px;
  height: 40px;
  background-color: #eee;
  border: 1px solid white;
  margin-top: -15px;

  padding: 0 10px;
`;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  //   const [music, setMusic] = useState(null);
  //   const [position, setPosition] = useState<number>(0);
  //   const interpolate = (start: number, end: number) => {
  //     let k = (position - 0) / 10; // 0 =>min  && 10 => MAX
  //     return Math.ceil((1 - k) * start + k * end) % 256;
  //   };
  //   console.log(position);
  //   const color = () => {
  //     let r = interpolate(255, 0);
  //     let g = interpolate(0, 255);
  //     let b = interpolate(0, 0);
  //     return `rgb(${r},${g},${b})`;
  //   };
  //   const pressHandle = note => {
  //     let playNote = new Sound(`${note}.mp3`, Sound.MAIN_BUNDLE, err => {
  //       if (err) {
  //         console.log('ERR===', err);
  //         return;
  //       }
  //       playNote.play(success => {
  //         console.log('Playing success', success);
  //         console.log(note);
  //         playNote.release();
  //       });
  //     });
  //     console.log('PLAYNOTE', playNote);
  //   };
  // openHandle
  const [images, setImage] = useState<any>([]);
  const [currentDeg, setCurrentDeg] = useState(90);

  const openImagePicker = () => {
    const imageList: any = [];
    ImagePicker.openPicker({
      multiple: true,
      includeExif: true,
      forceJpg: true,
      compressImageQuality: 0.8,
      maxFiles: 10,
      includeBase64: true,
    })
      .then(res => {
        console.log('res', res);
        res.map(image => {
          imageList.push({
            pathname: image.path,
            data: image?.data,
          });
        });
        setImage(imageList);
      })
      .catch(e => console.log('ERR', e.message));
  };
  console.log(images)
  return (
    <>
    {/* 
      <Gestures rotate={`${currentDeg}deg`} draggable={true} scalable={false} rotatable={true}>
       <View>
       <Image style={styles.img} source={{uri: 'https://m.media-amazon.com/images/I/71U6KzJ2w-L._AC_SL1000_.jpg'}} />
       </View>
       </Gestures>
       <DragAndDrop /> */}

       {/* <DragAndDrop /> */}
       <DraList />
       <Text>aaa</Text>
    </>
  );
};
{/* <Image style={styles.img} source={{uri: 'https://m.media-amazon.com/images/I/71U6KzJ2w-L._AC_SL1000_.jpg'}} /> */}

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
    backgroundColor: '#c7c4c4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 10,
    position: 'relative',
    marginRight: 10,
    width: 290,
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
  capturing: {
    display: 'flex',
    backgroundColor: '#d47777',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capturingText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  capturingBtn: {
    backgroundColor: '#f3b6b6',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 45,
    borderRadius: 20,
  },
  rowItem: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxTest:{
    width: 50,
    height: 50,
    backgroundColor: 'red',
    margin: 25
  },
  img:{
    width: 200,
    height: 200
  }
});

export default App;
