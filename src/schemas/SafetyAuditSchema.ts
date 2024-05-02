import Realm, { BSON, ObjectSchema } from 'realm';

export interface SafetyAudit {
  _id: BSON.ObjectId;
  auditDate: string;
  note: string;
  auditBy: string;
  coAuditor1: string;
  coAuditor2: string;
}

// Define the schema separately
export const SafetyAuditSchema: ObjectSchema = {
  name: 'SafetyAudit',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    auditDate: 'string',
    note: 'string',
    auditBy: 'string',
    coAuditor1: 'string',
    coAuditor2: 'string',
  },
};

// Extend Realm.Object and specify the schema
export class SafetyAuditObject extends Realm.Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  auditDate: string = '';
  note: string = '';
  auditBy: string = '';
  coAuditor1: string = '';
  coAuditor2: string = '';

  // No need to define schema here
}
