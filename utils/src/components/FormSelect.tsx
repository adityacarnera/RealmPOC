import React, { useCallback, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useController } from 'react-hook-form';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

const windowHeight = Dimensions.get('window').height;


const FormSelect = ({ name, control, options }:any) => {
  const { field } = useController({ control, name });

  const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
    const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleOpenSheet = () => {
    console.log('reached');
    
    setBottomSheetIndex(0);
    bottomSheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    setBottomSheetIndex(-1);
    bottomSheetRef.current?.collapse();
  };

  const handleOptionSelect = (option: any) => {
    field.onChange(option);
    handleCloseSheet();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleOpenSheet} style={{height: 40, borderWidth: 1}}>
        <Text>{field.value}</Text>
      </TouchableOpacity>
      {/* <View style={{height: windowHeight, position: 'absolute',top: 0}}> */}
      <BottomSheet
        ref={bottomSheetRef}
        index={bottomSheetIndex}
        snapPoints={[windowHeight - 200, windowHeight * 0.75, windowHeight * 0.5]}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
      >
        {options.map((option: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionSelect(option)}
            style={{ padding: 20, backgroundColor: 'red'}}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </BottomSheet>
      {/* </View> */}
      
    </View>
  );
};

export default FormSelect;
