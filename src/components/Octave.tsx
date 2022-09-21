import {View, Text, ScrollView} from 'react-native';

import React from 'react';
import styled from 'styled-components/native';
import { notes, NoteType } from '../utils/helpers';
import Note from './Note';

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  height: 500px;
`;
interface Props {
    notes: NoteType[];
    pressHandle: (note) => void;
    position: number
}

const Octave = (props: Props) => {


    const {notes, pressHandle, position} = props
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} contentOffset={{x: position, y: 0}}>
    <Wrapper>
   
      {notes.map((item: any) =>{
        console.log(item.color);
        return(
       <Note 
       key={item.note}
       color={item.color}
       note={item.note} 
       onPress ={() => pressHandle(item.note)}
       
       />)
})}

    </Wrapper>
    </ScrollView>
  );
};

export default Octave;
