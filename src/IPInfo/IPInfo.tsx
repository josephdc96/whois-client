import { Descriptions, Empty, Space } from 'antd';
import { RegistryData } from '../WhoisModel/RegistryData';
import { IPRecord } from '../WhoisModel/IPRecord';
import { SubRecord } from '../WhoisModel/SubRecord';
import '../WhoisModel/RegistryData'
import React from 'react';

function IPInfo(props: { registryData?: IPRecord, subRecord: SubRecord }) {
    return (
        <div>
            <Space direction="vertical">
                <Descriptions bordered>
                    <Descriptions.Item label="NetRange">{props.subRecord.netRange}</Descriptions.Item>
                    <Descriptions.Item label="CIDR">{props.subRecord.domainName}</Descriptions.Item>
                    <Descriptions.Item label="NetName">{props.subRecord.netName}</Descriptions.Item>
                    {props.subRecord.createdDate != undefined &&
                        <Descriptions.Item label="Created Date">{props.subRecord.createdDate.toUTCString()}</Descriptions.Item>
                    }
                    {props.subRecord.updatedDate != undefined &&
                        <Descriptions.Item label="Updated Date">{props.subRecord.updatedDate.toUTCString()}</Descriptions.Item>
                    }
                </Descriptions>
                <Descriptions title="Registrant" bordered>
                    {props.subRecord.registrant?.name != undefined &&
                        <Descriptions.Item label="Name">{props.subRecord.registrant.name}</Descriptions.Item>
                    }
                    {props.subRecord.registrant?.organization != undefined &&
                        <Descriptions.Item label="Organization">{props.subRecord.registrant.organization}</Descriptions.Item>
                    }
                    {props.subRecord.registrant?.street1 != undefined &&
                        <Descriptions.Item label="Street">{props.subRecord.registrant.street1}</Descriptions.Item>
                    }
                    {props.subRecord.registrant?.city != undefined &&
                        <Descriptions.Item label="City">{props.subRecord.registrant.city}</Descriptions.Item>
                    }
                    {props.subRecord.registrant?.state != undefined &&
                        <Descriptions.Item label="State">{props.subRecord.registrant.state}</Descriptions.Item>
                    }
                    {props.subRecord.registrant?.postalCode != undefined &&
                        <Descriptions.Item label="Postal Code">{props.subRecord.registrant.postalCode}</Descriptions.Item>
                    }
                    {props.subRecord.registrant?.country != undefined &&
                        <Descriptions.Item label="Country">{props.subRecord.registrant.country}</Descriptions.Item>
                    }
                    {props.subRecord.registrant?.telephone != undefined &&
                        <Descriptions.Item label="Phone">{props.subRecord.registrant.telephone}</Descriptions.Item>
                    }
                    {props.subRecord.registrant?.email != undefined &&
                        <Descriptions.Item label="Email">{props.subRecord.registrant.email}</Descriptions.Item>
                    }
                </Descriptions>
            </Space>
        </div>
    )
}

export { IPInfo };