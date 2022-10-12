import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import Draggable from './Draggable';
import ImagePicker from 'react-native-image-crop-picker';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Pdf from 'react-native-pdf';

const {width, height} = Dimensions.get('window');
const circleSize = width - 36;
const itemSize = width / 3;
const radius = circleSize / 2 - itemSize / 2;
const center = radius;

const DragAndDrop = () => {
  // Drag drop
  const [movingDraggable, setMovingDraggable] = useState(null);
  const [releaseDraggable, setReleaseDraggable] = useState(null);
  const [items, setItems] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const [pdfSource, setPdfSource] = useState<any>();
 

  useEffect(() => {
    setMovingDraggable(null);
    setReleaseDraggable(null);
    return () => {};
  }, [items]);
  const degToRad = deg => {
    return (deg * Math.PI) / 180;
  };

  const setup = index => {
    const dividedAngle = 360 / items.length;
    const angleRad = degToRad(270 + index * dividedAngle);
    const x = radius * Math.cos(angleRad) + center;
    const y = radius * Math.sin(angleRad) + center;
    return {x, y};
  };

  const onMovingDraggable = movingDraggable => {
    setMovingDraggable(movingDraggable);
  };

  const onReleaseDraggable = releaseDraggable => {
    setMovingDraggable(null);
    setReleaseDraggable(releaseDraggable);
  };
  const swap = (index1, index2) => {
    var arr = [...items];
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    setItems(arr);
  };

  const openImagePicker = () => {
    const imageList: any = [];
    const imgPath: any = [];
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
            data: image.data,
          });
          imgPath.push(image.path);
        });
        setItems(imageList);
        setImagePath(imgPath);
        // console.log(imgPath
      })
      .catch(e => console.log('ERR', e.message));
  };

  const generatePdf = async (images: any[]) => {
    const html = await images.map(image => {
      return `
             <div>
            <img src="${image}" width="300" height="300"  />
            </div>
        `;
    });

    const options = {
      html: html.join(''),
      fileName: 'filePDF',
      directory: 'Images',
    };

    const file = await RNHTMLtoPDF.convert(options);
    const filePath = `${file.filePath}`;
    setPdfSource(filePath);
    return file;
  };
  console.log(pdfSource);
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={styles.addBtn} onPress={openImagePicker}>
          <Text>ADD</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => generatePdf(imagePath)}>
          <Text>PDF</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderIem = () => {
    return (
      <View style={styles.moreThan10Container}>
        <View style={styles.squaresViewContainer}>
          {items.map((item, index) => {
            const {x, y} = setup(index);
            return (
              <Draggable
                key={index}
                index={index}
                movingDraggable={movingDraggable}
                onMovingDraggable={onMovingDraggable}
                releaseDraggable={releaseDraggable}
                onReleaseDraggable={onReleaseDraggable}
                swap={swap}
                // position={{
                //    position: '',
                //    left: null,
                //    top:null,
                // }}
                renderChild={isMovedOver => {
                  return (
                    <View
                      style={[
                        isMovedOver && styles.moreThan10ItemMovedOver,
                        styles.moreThan10Item,
                      ]}>
              
                      <Image
                        style={[
                            styles.img,
                        ]}
                        source={{uri: item.pathname}}
                        // style={}
                      />
                    </View>
                  );
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar backgroundColor={'#20232A'} barStyle="light-content" />
      <View style={styles.viewContainer}>
          {renderHeader()}
          <ScrollView
            scrollEnabled={!movingDraggable}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollView}>
            {renderIem()}

            {pdfSource && (
              <Pdf
                style={styles.pdf}
                source={{uri: pdfSource}}
                onError={error => Alert.alert(`${error}`)}
              />
            )}
          </ScrollView>
     
      </View>
    </SafeAreaView>
  );
};

export default DragAndDrop;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: '#20232A',
  },
  viewContainer: {
    flex: 1,
    width,
    backgroundColor: '#20232A',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 18,
    backgroundColor: '#a36161',
  },
  header: {
    width,
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
    paddingTop: 15,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff4c6f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessThan10Container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: height * 0.2,
  },
  circleViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    // padding: 16,
  },
  centerCircle: {
    width: width / 3,
    height: width / 3,
    borderRadius: width / 1.5,
    backgroundColor: '#ff4c6f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },

  lessThan10Item: {
    width: 100,
    height: itemSize,
    overflow: 'hidden',
    marginLeft: 10,
  },
  lessThan10ItemMovedOver: {
    borderWidth: 6,
    borderColor: '#FEDC33',
  },
  img: {
    flex: 1,
    width: 100,
    height: 100,
    resizeMode: 'cover',
    backgroundColor: 'red',
  },
  moreThan10Container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: height * 0.2,
  },
  squaresViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 16,
  },
  moreThan10Item: {
    width: itemSize,
    height: itemSize,
    borderRadius: 8,
    margin: 6,
    overflow: 'hidden',
  },
  moreThan10ItemMovedOver: {
    borderWidth: 6,
    borderColor: '#FEDC33',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    height: 500,
  },
});
