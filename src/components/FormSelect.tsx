import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, {
    useCallback,
    useRef,
    useState
} from 'react';
import { useController } from 'react-hook-form';
import { Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
  
  export interface SelectFieldProps {
    options: {label: string; value: number|string}[];
    control: any;
    name: string;
    label: string;
    required?: boolean
  }
  
  const SelectField = (props: SelectFieldProps) => {
    const {options = [], name, control, label, required} = props;
    const sheet = useRef<BottomSheetModal>(null);
    const { field } = useController({ control, name, rules: {required: required} });

    const [bottomSheetIndex, setBottomSheetIndex] = useState<number>(-1);
  
    const {bottom} = useSafeAreaInsets();
  
  
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
      [],
    );
  
    const handleOpenSheet = () => {  
      setBottomSheetIndex(0);
      sheet.current?.present();
    };
  
    const handleCloseSheet = () => {
      setBottomSheetIndex(-1);
      sheet.current?.dismiss();
    };
  
    return (
      <>
        <Text style={{marginBottom: 4}}>{label}</Text>
        <TouchableOpacity activeOpacity={1} onPress={handleOpenSheet} style={{borderWidth: 1, height: 50,justifyContent: 'center', paddingHorizontal: 12}}>
            <Text>{field.value?.label ?? ''}</Text>
        </TouchableOpacity>
  
        <BottomSheetModal
          ref={sheet}
          snapPoints={['50%']}
          stackBehavior="replace"
          enableDismissOnClose
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}>
          <BottomSheetFlatList
            style={{marginBottom: bottom + 0}}
            data={options}
            keyExtractor={o => o.value.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  field.onChange(item);
                  handleCloseSheet();
                }}
                style={{padding: 20}}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheetModal>
      </>
    );
  };
  export default SelectField;
  