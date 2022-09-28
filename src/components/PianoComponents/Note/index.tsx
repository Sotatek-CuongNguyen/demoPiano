import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  color: string;
  note: string;
  onPress: () => void;
}
const Black = styled.View`
  height: 128px;
  width: 32px;
  margin: 0 -16px 0 -16px;
  z-index: 2;
  border: 1px solid #000;
  background-color: #000;
`;

const White = styled.View`
  height: 256px;
  width: 64px;
  z-index: 1;
  border: 1px solid #d4d1d1;
  background-color: #fff;
  box-sizing: border-box;
  :active {
    background: #eee;
  }
`;

const Notes = (props: Props) => {
  const {color, note, onPress} = props;
  return color == 'white' ? (
    <White
      value={note}
      onPress={onPress}
      onTouchStart={onPress}
      onTouchEnd={onPress}
    />
  ) : color == 'black' ? (
    <View
      style={styles.black}
      value={note}
      onPress={onPress}
      onTouchStart={onPress}
      onTouchEnd={onPress}></View>
  ) : null;
};

export default Notes;

const styles = StyleSheet.create({
  black: {
    height: 128,
    width: 32,
    marginLeft: -16,
    marginRight: -16,
    zIndex: 2,
    backgroundColor: '#080808',
    shadowColor: '#ff0000',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
