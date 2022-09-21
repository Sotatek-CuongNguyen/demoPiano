import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
 

interface Props  {
    color: string ;
    note: string ;
    onPress: () => void  
}
const Black = styled.View`
  width: 50px;
  height: 130px;
  background: black;
  border: solid black 1px;
  /* position: absolute; */
  top: 0;
  margin: 1px;
  margin-left: -20px;
  margin-right: -30px;
  :active {
    background: #8d8686;
  }
  z-index: 1;
`;

const White = styled.View`
  width: 60px;
  height: 200px;
  background: white;
  border: solid black 1px;
  box-shadow: 2px 5px;
  margin: 1px;
  /* margin-left: -20px; */
  box-sizing: border-box;
  :active {
    background: #eee;
  }
`;

const Note = (props: Props) => {
    const {color, note, onPress} = props
    console.log("test",color)
//   return (
//     // <View>
//     //   <Text>Note</Text>
//     // </View>
//   );
return color == 'white' ? ( <White value={note} onPress={onPress} onTouchStart={() => console.log("hello")} onTouchEnd={() => console.log("hello")}  />) : color =='black' ? (  <Black value={note} onPress={onPress} onTouchStart={() => console.log("hello")} onTouchEnd={() => console.log("hello")} /> ) : null
};

export default Note;
