import { AuditRecord } from "./AuditRecord";
import { ContactRecord } from "./ContactRecord";

export interface SubRecord {
    audit?: AuditRecord
    createdDate?: Date;
    updatedDate?: Date;
    registrant?: ContactRecord,
    registrarName?: string;
    status?: string;
    administrativeContact?: ContactRecord,
    technicalContact?: ContactRecord,
    domainName?: string,
    parseCode?: number,
    netRange?: string,
    netName?: string
}