import { AuditRecord } from "./AuditRecord";
import { ContactRecord } from "./ContactRecord";
import { NameServers } from "./NameServersRecord";
import { RegistryData } from "./RegistryData";

export interface WhoisRecord {
    domainName?: string;
    nameServers?: NameServers;
    ips?: [];
    status?: string;
    parseCode?: number;
    audit?: AuditRecord;
    registrarName?: string;
    registrarIANAID?: number;
    whoisServer?: string;
    createdDateNormalized?: Date;
    updatedDateNormalized?: Date;
    expiresDateNormalized?: Date;
    registryData?: RegistryData;
    contactEmail?: string;
    domainNameExt?: string;
    estimatedDomainAge?: number;
    registrant?: ContactRecord;
    administrativeContact?: ContactRecord;
    technicalContact?: ContactRecord;
}