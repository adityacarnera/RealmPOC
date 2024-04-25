// App.tsx
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import SelectField from './utils/src/NewSelect';
import FormInput from './utils/src/components/FormInput';

const App = () => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      team: {label: '', value: ''}
    },
  });
  console.log('render');
  const teams = [
    { label: "Hawks", value: "ATL" },
    { label: "Celtics", value: "BOS" },]

  const onSubmit = (data: any) => {
    console.log(data, 'data');
  };

  return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <GestureHandlerRootView style={{flex: 1}}>
    <BottomSheetModalProvider>

      <SafeAreaView style={{padding: 12}}>
        <FormInput
          name="firstName"
          label="First Name"
          control={control}
          required
        />
        <FormInput
          name="lastName"
          label="Last Name"
          control={control}
          required
        />
        {/* <FormSelect
          name="gender"
          label="Gender"
          control={control}
          options={options}
          required
        /> */}
        <SelectField
        name="team"
        control={control}
        options={teams}
      />
        <TouchableOpacity
          style={styles.btn}
          onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>

      </BottomSheetModalProvider>

    </GestureHandlerRootView>
      </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  btn: {
    borderWidth: 1,
    padding: 6,
    height: 40,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
