import React from 'react';
import { DomainInfo } from './DomainInfo/DomainInfo';
import { ContactInfo } from './ContactInfo/ContactInfo';
import { ConvertToModel, ConvertToIPModel } from './WhoisModel/ConvertToModel';
import { IPRecord } from './WhoisModel/IPRecord';
import { IPInfo } from './IPInfo/IPInfo';
import { SubRecord } from './WhoisModel/SubRecord';
import { Alert, Button, Empty, Row, Space, Col, Input, Layout, Card, Modal} from 'antd'
import http from 'http';
import { WhoisRecord } from './WhoisModel/WhoisRecord';
import 'antd/dist/antd.css';
import './App.css';
import TextArea from 'rc-textarea';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

/**
 * Stub interface for properties
 */
interface IProps {

}

/**
 * Interface defining state values
 */
interface IState {
  whoisRecord?: WhoisRecord;
  ipRecord?: IPRecord;
  errorMessage?: string;
  isLoading: boolean;
  isIP: boolean;
  isModalVisible: boolean;
}

/**
 * Main React application component
 */
class App extends React.Component<IProps, IState> {
  search: JSX.Element;

  /**
   * Constructor for App. Defines initial state and sets the Search component
   * 
   * @param props passed in props.
   */
  constructor(props: any) {
    super(props);
    this.state = { whoisRecord: undefined, errorMessage: undefined, isLoading: false, isIP: false, isModalVisible: false }
    this.searchClick = this.searchClick.bind(this);
    this.handleOK = this.handleOK.bind(this);
    this.viewRawData = this.viewRawData.bind(this);
    this.search = <Search size="large" placeholder="Input domain or IP address" loading={this.state.isLoading} onSearch={this.searchClick} enterButton="Search"/>
  }

  /**
   * Handles the search box button and enter events
   * 
   * @param event The event details
   */
  searchClick(event: any) {
    // If the search box is empty show an error prompt.
    if (this.search.props.value == '') {
      this.setState({
        whoisRecord: this.state.whoisRecord,
        errorMessage: 'Please enter a domain or IP address',
        isLoading: false
      })
      return;
    }

    this.setState({
      whoisRecord: undefined,
      errorMessage: undefined,
      isLoading: true,
      isIP: this.state.isIP
    })
    http.get(`${process.env.REACT_APP_SERVER_LOCATION}/domain?domain=${event}`, res => {
      let data = ''

      res.on('data', chunk => {
        data += chunk;
      });
      if (res.statusCode == 400 || res.statusCode == 500) {
        // If an HTTP 400 or 500 status is returned then show the resultant error/
        res.on('end', () => {
          this.setState({
            whoisRecord: undefined,
            errorMessage: JSON.parse(data).error,
            isLoading: false,
            isIP: this.state.isIP
          })
        })
      } else {
        // Define the state based on whether an IP or Domain was passed.
        res.on('end', () => {
          this.setState({
            whoisRecord: JSON.parse(data).isIP 
              ? undefined
              : ConvertToModel(JSON.parse(data).WhoisRecord),
            ipRecord: JSON.parse(data).isIP 
              ? ConvertToIPModel(JSON.parse(data).WhoisRecord)
              : undefined,
            errorMessage: undefined,
            isLoading: false,
            isIP: JSON.parse(data).isIP
          })
          this.render();
        })
      }
      res.on('error', err => {
        this.setState({
          whoisRecord: undefined,
          errorMessage: err.message,
          isLoading: false,
          isIP: this.state.isIP
        })
      })
    })
  }

  /**
   * Handle the OK/Cancel button on the Raw Modal
   */
  handleOK() {
    this.setState({
      isModalVisible: false
    })
  }

  /**
   * Shows the Raw Modal
   */
  viewRawData() {
    this.setState({
      isModalVisible: true
    })
  }

  render() {
    return (
      <div className="App">
        <Modal title="Raw WHOIS" visible={this.state.isModalVisible} onOk={this.handleOK} onCancel={this.handleOK} width={800}>
          <TextArea value={this.state.isIP ? this.state.ipRecord?.rawText : this.state.whoisRecord?.rawText} style={{width: '100%', height: '640px'}} readOnly/>
        </Modal>
        <Layout>
          <Header>
            <h1 className="logo">
              WHOIS Lookup
            </h1>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Row>
                <Col xs={{ span: 16, offset: 4 }} lg={{ span: 8, offset: 8}}>
                  {this.search}
                </Col>
                <Col xs={{span: 4}} lg={{offset: 2, span: 2}}>
                  <Button size="large" style={{width: '100%'}} onClick={this.viewRawData}>View Raw</Button>
                </Col>
              </Row>
              {this.state.errorMessage != undefined &&
                <Row>
                  <Col xs={{span: 24}} lg={{offset: 4, span: 16}}>
                    <Alert style={{ marginTop: '15px' }} message={this.state.errorMessage} type="error"/>
                  </Col>
                </Row>
              }
              <Row>
                <Col xs={{span: 24}} lg={{offset: 4, span: 16}}>
                  { !this.state.isIP &&
                    <Space style={{width: '100%' }} direction="vertical">
                      <Card title="Domain Information">
                        <IsRegistryData registryData={this.state.whoisRecord} />
                      </Card>
                      <Card title="Registrant Contact">
                        <IsContactData registryData={this.state.whoisRecord} type='registrant'/>                      
                      </Card>
                      <Card title="Administrative Contact">
                        <IsContactData registryData={this.state.whoisRecord} type='administrative'/>    
                      </Card>
                      <Card title="Technical Contact">
                        <IsContactData registryData={this.state.whoisRecord} type='technical'/>    
                      </Card>
                    </Space>
                  }
                  { this.state.isIP &&
                    <Space style={{width: '100%' }} direction="vertical">
                      {this.state.ipRecord?.subRecords.map(x => <Card title="IP Information">
                          <IsSubRecord registryData={this.state.ipRecord} subRecord={x}/>
                        </Card>)}
                    </Space>
                  }
                </Col>
              </Row>
            </div>
          </Content>
          <Footer style={{ textAlign:  'center' }}>WHOIS Lookup ©2020 Created by Joseph Cauble</Footer>
        </Layout>
      </div>
    );
  }
}

/**
 * If valid registry data is present, show a DomainInfo card
 * 
 * @param props Accepts an object with a WhoIsRecord
 * @returns an Empty component or a DomainInfo component
 */
function IsRegistryData(props: { registryData?: WhoisRecord }) {
  const registryData = props.registryData;

  if (registryData == undefined || registryData.registryData == undefined) {
    return <Empty/>
  } else {
    return <DomainInfo registryData={registryData.registryData}/>
  }
}

/**
 * If valid contact data is present, show a ContactInfo card
 * 
 * @param props Accepts an object with a WhoIsRecord and a string defining what contact to process
 * @returns an Empty component or a ContactInfo component
 */
function IsContactData(props: { registryData?: WhoisRecord, type: string }) {
  const registryData = props.registryData;
  if (registryData == undefined) {
    return <Empty/>
  }
  
  switch (props.type) {
    case 'registrant':
      if (registryData.registrant == undefined) {
        return <Empty/>
      } else {
        return <ContactInfo contactInfo={registryData.registrant}/>
      }
    case 'administrative':
      if (registryData.administrativeContact == undefined) {
        return <Empty/>
      } else {
        return <ContactInfo contactInfo={registryData.administrativeContact}/>
      }
    case 'technical':
      if (registryData.technicalContact == undefined) {
        return <Empty/>
      } else {
        return <ContactInfo contactInfo={registryData.technicalContact}/>
      }
    default:
      return(<div></div>)
  }
}

/**
 * If valid subrecord data is present, show an IPInfo card
 * 
 * @param props Accepts an object with a WhoIsRecord and a Subrecord object
 * @returns an Empty component or an IPInfo component
 */
function IsSubRecord(props: { registryData?: IPRecord, subRecord?: SubRecord }) {
  const subRecord = props.subRecord;
  if (subRecord == undefined) {
    return <Empty/>
  } else {
    return <IPInfo registryData={props.registryData} subRecord={subRecord}/>
  }
}

export default App;
