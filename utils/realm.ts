// // realm.ts
import Realm, {BSON} from 'realm';
import {schemas} from '../src/schemas';
import {SafetyAudit} from '../src/schemas/SafetyAuditSchema';

const databaseOptions: Realm.Configuration = {
  path: 'realmSafetyAudit.realm',
  schema: schemas,
  schemaVersion: 0,
};

const realm = new Realm(databaseOptions);

export const addSafetyAudit = (
  auditDate: string,
  note: string,
  auditBy: string,
  coAuditor1: string,
  coAuditor2: string,
): void => {
  realm.write(() => {
    realm.create<SafetyAudit>('SafetyAudit', {
      _id: new BSON.ObjectId(),
      auditDate,
      note,
      auditBy,
      coAuditor1,
      coAuditor2,
    });
  });
};

export const getSafetyAudits = (): any => {
  return realm.objects<SafetyAudit>('SafetyAudit');
};

export const deleteSafetyAudit = (id: BSON.ObjectId): void => {
  const safetyAudit = realm.objectForPrimaryKey<SafetyAudit>('SafetyAudit', id);
  realm.write(() => {
    realm.delete(safetyAudit);
  });
};

// export const updateTask = (
//   taskId: number,
//   newData: Partial<SafetyAudit>,
// ): void => {
//   const task = realm.objectForPrimaryKey<SafetyAudit>('SafetyAudit', taskId);

//   if (task) {
//     realm.write(() => {
//       Object.keys(newData).forEach(key => {
//         (task as any)[key] = newData[key];
//       });
//     });
//   } else {
//     console.error(`SafetyAudit with ID ${taskId} not found.`);
//   }
// };

// export const clearTasks = (): void => {
//   realm.write(() => {
//     const allTasks = realm.objects<SafetyAudit>('SafetyAudit');
//     realm.delete(allTasks);
//   });
// };
