import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {deleteSafetyAudit, getSafetyAudits} from '../../utils/realm';
import Card from '../components/Card';
import {SafetyAudit} from '../schemas/SafetyAuditSchema';
import { BSON } from 'realm';
import { RootStackParamList } from '../routes/types';

const Home: React.FC = () => {
  const [audits, setAudits] = useState<SafetyAudit[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    setAudits(getSafetyAudits());
  }, []);


const handleAuditDelete = (id :BSON.ObjectId) => {
  let tempAudits = [...audits]
  tempAudits = tempAudits.filter(el => el._id.toString() !== id.toString())
  setAudits(tempAudits)
  setTimeout(() => {deleteSafetyAudit(id)}, 2000)
}

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 12}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('SafetyAuditForm')}>
          <Text>Add Safety Audits</Text>
        </TouchableOpacity>
        <FlatList
          data={audits}
          renderItem={({item}) => <Card audit={item} handleDelete={handleAuditDelete}/>}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{paddingVertical: 20, rowGap: 16}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 6,
    height: 40,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    width: '40%',
  },
});
