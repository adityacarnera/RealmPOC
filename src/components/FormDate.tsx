import React, {useState} from 'react';
import { useController } from 'react-hook-form';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const FormDate = ({label, name, control, required}: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {field} = useController({control, name, rules: {required: required}})
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    field.onChange(date.toLocaleDateString())
    hideDatePicker();
  };

  return (
    <>
      <Text style={{marginBottom: 4}}>{label}</Text>
      <TouchableOpacity
        activeOpacity={1}
        onPress={showDatePicker}
        style={{
          borderWidth: 1,
          height: 50,
          justifyContent: 'center',
          paddingHorizontal: 12,
        }}>
        <Text>{field.value}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={field.value}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default FormDate;
