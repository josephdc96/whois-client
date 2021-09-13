import { Descriptions, Empty } from 'antd';
import { RegistryData } from '../WhoisModel/RegistryData';

/**
 * Domain Info component
 * 
 * @param props Accepts an object with a RegistryData object
 */
function DomainInfo(props: { registryData: RegistryData }) {
    const nameserverList = props.registryData.nameServers?.hostNames?.map((emp) => <span>{emp}<br/></span>)

    return(
        <div>
            <Descriptions bordered>
                <Descriptions.Item label="Domain">{props.registryData.domainName}</Descriptions.Item>
                <Descriptions.Item label="Registrar">{props.registryData.registrarName}</Descriptions.Item>
                <Descriptions.Item label="Registered On">{props.registryData.createdDate?.toUTCString()}</Descriptions.Item>
                <Descriptions.Item label="Expires On">{props.registryData.expiresDate?.toUTCString()}</Descriptions.Item>
                <Descriptions.Item label="Updated On">{props.registryData.updatedDate?.toUTCString()}</Descriptions.Item>
                <Descriptions.Item label="Status">{props.registryData.status}</Descriptions.Item>
                <Descriptions.Item label="Name Servers:">{nameserverList}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export { DomainInfo };