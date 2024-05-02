import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { SafetyAudit } from '../schemas/SafetyAuditSchema';
import { BSON } from 'realm';

const Card: React.FC<{audit: SafetyAudit, handleDelete: (id: BSON.ObjectId) => void}> = ({audit,  handleDelete}) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.row, {justifyContent: 'space-between', marginBottom: 10}]}>
        <View style={styles.row}>
          <Text>Audit By: </Text>
          <Text>{audit.auditBy}</Text>
        </View>
        <View style={styles.row}>
          <Text>Audit Date: </Text>
          <Text>{audit.auditDate}</Text>
        </View>
      </View>
      <View style={[styles.row, {justifyContent: 'space-between', marginBottom: 10}]}>
        <View style={styles.row}>
          <Text>Co Auditor 1: </Text>
          <Text>{audit.coAuditor1}</Text>
        </View>
        <View style={styles.row}>
          <Text>Co Auditor 2: </Text>
          <Text>{audit.coAuditor2}</Text>
        </View>
      </View>
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <View style={styles.row}>
          <Text>Note: </Text>
          <Text>{audit.note}</Text>
        </View>
        <TouchableOpacity
          style={styles.btn} onPress={() => handleDelete(audit._id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardWrapper: {
    justifyContent: 'center',
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
