import { ContactRecord } from '../WhoisModel/ContactRecord';
import { Descriptions } from 'antd'

function ContactInfo(props: {contactInfo: ContactRecord}) {
    return(
        <div>
            <Descriptions bordered>
                {props.contactInfo.name != undefined &&
                    <Descriptions.Item label="Name">{props.contactInfo.name}</Descriptions.Item>
                }
                {props.contactInfo.organization != undefined &&
                    <Descriptions.Item label="Organization">{props.contactInfo.organization}</Descriptions.Item>
                }
                {props.contactInfo.street1 != undefined &&
                    <Descriptions.Item label="Street">{props.contactInfo.street1}</Descriptions.Item>
                }
                {props.contactInfo.city != undefined &&
                    <Descriptions.Item label="City">{props.contactInfo.city}</Descriptions.Item>
                }
                {props.contactInfo.state != undefined &&
                    <Descriptions.Item label="State">{props.contactInfo.state}</Descriptions.Item>
                }
                {props.contactInfo.postalCode != undefined &&
                    <Descriptions.Item label="Postal Code">{props.contactInfo.postalCode}</Descriptions.Item>
                }
                {props.contactInfo.country != undefined &&
                    <Descriptions.Item label="Country">{props.contactInfo.country}</Descriptions.Item>
                }
                {props.contactInfo.telephone != undefined &&
                    <Descriptions.Item label="Phone">{props.contactInfo.telephone}</Descriptions.Item>
                }
                {props.contactInfo.email != undefined &&
                    <Descriptions.Item label="Email">{props.contactInfo.email}</Descriptions.Item>
                }
            </Descriptions>
        </div>
    )
}

export { ContactInfo }