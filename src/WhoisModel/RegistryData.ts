import { NameServers } from './NameServersRecord'
import { AuditRecord } from './AuditRecord'
 
/**
 * Registry Data object
 */
export interface RegistryData {
    createdDate?: Date;
    updatedDate?: Date;
    expiresDate?: Date;
    domainName?: string;
    nameServers?: NameServers;
    status?: string;
    parseCode?: number;
    audit?: AuditRecord;
    registrarName?: string;
    registrarIANAID?: string;
    createdDateNormalized?: Date;
    updatedDateNormalized?: Date;
    expiresDateNormalized?: Date;
    whoisServer?: string;
}