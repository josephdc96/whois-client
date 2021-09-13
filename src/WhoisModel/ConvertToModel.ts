import { IPRecord } from './IPRecord';
import { WhoisRecord } from './WhoisRecord';

/**
 * Converts a domain JSON object from the server into a valid WhoisRecord object
 * 
 * @param result The JSON object from the API
 * @returns A valid WhoisRecord objects
 */
function ConvertToModel(result: any): WhoisRecord {
    let record: WhoisRecord = {
        domainName: result.domainName,
        nameServers: result.nameServers,
        status: result.status,
        parseCode: result.parseCode,
        audit: {
            createdDate: new Date(result.audit.createdDate),
            updatedDate: new Date(result.audit.updatedDate)
        },
        registrarName: result.registrarName,
        registrarIANAID: result.registrarIANAID,
        whoisServer: result.whoisServer,
        createdDateNormalized: new Date(result.createdDateNormalized),
        updatedDateNormalized: new Date(result.updatedDateNormalized),
        expiresDateNormalized: new Date(result.expiresDateNormalized),
        registryData: {
            createdDate: new Date(result.registryData.createdDate),
            updatedDate: new Date(result.registryData.updatedDate),
            expiresDate: new Date(result.registryData.expiresDate),
            domainName: result.registryData.domainName,
            nameServers: result.registryData.nameServers,
            status: result.registryData.status,
            parseCode: result.registryData.parseCode,
            audit: {
                createdDate: new Date(result.registryData.audit.createdDate),
                updatedDate: new Date(result.registryData.audit.updatedDate)
            },
            registrarName: result.registryData.registrarName,
            registrarIANAID: result.registryData.registrarIANAID,
            createdDateNormalized: new Date(result.registryData.createdDateNormalized),
            updatedDateNormalized: new Date(result.registryData.updatedDateNormalized),
            expiresDateNormalized: new Date(result.registryData.expiresDateNormalized),
            whoisServer: result.registryData.whoisServer
        },
        contactEmail: result.contactEmail,
        domainNameExt: result.domainNameExt,
        estimatedDomainAge: result.estimatedDomainAge,
        registrant: result.registrant,
        administrativeContact: result.administrativeContact,
        technicalContact: result.technicalContact,
        rawText: result.rawText
    }
    return record;
}

/**
 * Converts an IP JSON object from the server into a valid IPRecord object
 * 
 * @param result The JSON object from the API
 * @returns A valud IPRecord object
 */
function ConvertToIPModel(result: any): IPRecord {
    let record: IPRecord = {
        subRecords: [],
        rawText: ''
    };

    const sRecords: any[] = result.subRecords as any[]
    
    // If an IP address has a single organization associated
    if (sRecords == undefined) {
        record.subRecords.push({
            createdDate: result.registryData.createdDate != undefined ? new Date(result.registryData.createdDate) : undefined,
            updatedDate: result.registryData.updatedDate != undefined ? new Date(result.registryData.updatedDate) : undefined,
            registrant: result.registryData.registrant,
            administrativeContact: result.registryData.administrativeContact,
            technicalContact: result.registryData.technicalContact,
            domainName: result.registryData.domainName,
            parseCode: result.registryData.parseCode,
            netRange: result.registryData.customField1Value,
            netName: result.registryData.customField2Value  
        })
        record.rawText += `\n${result.registryData.rawText}`
    } 
    // If an IP address has multiple organizations associated
    else {
        sRecords.forEach(r => {
            record.subRecords.push({
                createdDate: new Date(r.createdDate),
                updatedDate: new Date(r.updatedDate),
                registrant: r.registrant,
                administrativeContact: r.administrativeContact,
                technicalContact: r.technicalContact,
                domainName: r.domainName,
                parseCode: r.parseCode,
                netRange: r.customField1Value,
                netName: r.customField2Value
            })
            record.rawText += `\n${r.rawText}`
        });
    }
    return record;
}

export { ConvertToIPModel, ConvertToModel }