import React from 'react'
import { useController } from 'react-hook-form'
import { Platform, StyleSheet, TextInput, Text, View } from 'react-native'

export default function FormInput({
  name,
  control,
  required,
  label
}: any) {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
    rules: { required: required},
  })
  return (
    <>
    <Text>{label}</Text>
    <View style={{borderWidth: 1, marginBottom: 12, height: 55, paddingHorizontal: 12, justifyContent: 'center'}}>
<TextInput
      value={field.value ? `${field.value}` : ``}
      onChangeText={(text)=>(field.onChange(text))}
    />
    </View>
    
    </>
    
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    marginTop: Platform.OS === 'ios' ? 8 : -4,
    paddingLeft: 5,
  },
})
