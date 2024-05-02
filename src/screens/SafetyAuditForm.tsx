import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FormInput from '../components/FormInput';
import SelectField from '../components/FormSelect';
import {useForm} from 'react-hook-form';
import FormDate from '../components/FormDate';
import {addSafetyAudit} from '../../utils/realm';
import {SafetyAudit} from '../schemas/SafetyAuditSchema';
import { BSON } from 'realm';

const SafetyAuditForm: React.FC = () => {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      note: '',
      auditBy: {label: '', value: ''},
      coAuditor1: {label: '', value: ''},
      coAuditor2: {label: '', value: ''},
    },
  });

  const auditors = [
    {label: 'John Doe', value: 486},
    {label: 'Joe Smith', value: 487},
    {label: 'Will Jacks', value: 488},
    {label: 'Luke Shaw', value: 489},
    {label: 'Cole Palmer', value: 490},
  ];

  const onSubmit = (data: any) => {
    console.log(data, 'data');
    addSafetyAudit(
      data.auditDate,
      data.note,
      data.auditBy.label,
      data.coAuditor1.label,
      data.coAuditor2.label,
    );
  };

  const onError = (error: any) => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 24}}>
        <View style={{marginBottom: 14}}>
          <FormDate
            label={'Audit Date'}
            name={'auditDate'}
            control={control}
            required
          />
        </View>
        <View style={{marginBottom: 14}}>
          <SelectField
            label="Audit By"
            name="auditBy"
            control={control}
            options={auditors}
            required
          />
        </View>
        <View style={{marginBottom: 14}}>
          <SelectField
            label="Co Auditor 01"
            name="coAuditor1"
            control={control}
            options={auditors}
            required
          />
        </View>
        <View style={{marginBottom: 14}}>
          <SelectField
            label="Co Auditor 02"
            name="coAuditor2"
            control={control}
            options={auditors}
            required
          />
        </View>
        <View style={{marginBottom: 14}}>
          <FormInput name="note" label="Note" control={control} required />
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={handleSubmit(onSubmit, onError)}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SafetyAuditForm;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    padding: 6,
    height: 40,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
