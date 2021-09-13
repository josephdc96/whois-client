import React, { MouseEventHandler } from 'react';
import logo from './logo.svg';
import { DomainInfo } from './DomainInfo/DomainInfo';
import { ContactInfo } from './ContactInfo/ContactInfo';
import { ConvertToModel, ConvertToIPModel } from './WhoisModel/ConvertToModel';
import { IPRecord } from './WhoisModel/IPRecord';
import { IPInfo } from './IPInfo/IPInfo';
import { SubRecord } from './WhoisModel/SubRecord';
import { Alert, Button, Checkbox, Empty, Row, Space, Col, Input, Layout, Typography, Card, Descriptions} from 'antd'
import http from 'http';
import { WhoisRecord } from './WhoisModel/WhoisRecord';
import 'antd/dist/antd.css';
import './App.css';
import { ContactRecord } from './WhoisModel/ContactRecord';

const { Header, Content, Footer } = Layout;
const { Title } = Typography
const { Search } = Input;

interface IProps {

}

interface IState {
  whoisRecord?: WhoisRecord;
  ipRecord?: IPRecord;
  errorMessage?: string;
  isLoading: boolean;
  isIP: boolean;
}

class App extends React.Component<IProps, IState> {
  search: JSX.Element;

  constructor(props: any) {
    super(props);
    this.state = { whoisRecord: undefined, errorMessage: undefined, isLoading: false, isIP: false }
    this.searchClick = this.searchClick.bind(this);
    this.search = <Search placeholder="Input domain or IP address" loading={this.state.isLoading} onSearch={this.searchClick} enterButton="Search"/>
  }

  searchClick(event: any) {

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
      if (res.statusCode == 400) {
        res.on('end', () => {
          this.setState({
            whoisRecord: undefined,
            errorMessage: JSON.parse(data).error,
            isLoading: false,
            isIP: this.state.isIP
          })
        })
      } else {
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

  render() {
    return (
      <div className="App">
        <Layout>
          <Header>
            <h1 className="logo">
              WHOIS Lookup
            </h1>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Row>
                <Col offset={8} span={8}>
                  {this.search}
                </Col>
                <Col offset={2} span={2}>
                  <Button style={{width: '100%'}}>Download Raw</Button>
                </Col>
              </Row>
              {this.state.errorMessage != undefined &&
                <Row>
                  <Col offset={4} span={16}>
                    <Alert style={{ marginTop: '15px' }} message={this.state.errorMessage} type="error"/>
                  </Col>
                </Row>
              }
              <Row>
                <Col offset={4} span={16}>
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

function IsRegistryData(props: { registryData?: WhoisRecord }) {
  const registryData = props.registryData;

  if (registryData == undefined || registryData.registryData == undefined) {
    return <Empty/>
  } else {
    return <DomainInfo registryData={registryData.registryData}/>
  }
}

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

function IsSubRecord(props: { registryData?: IPRecord, subRecord?: SubRecord }) {
  const subRecord = props.subRecord;
  if (subRecord == undefined) {
    return <Empty/>
  } else {
    return <IPInfo registryData={props.registryData} subRecord={subRecord}/>
  }
}

export default App;
