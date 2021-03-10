import './App.css';
import React from 'react';
import {Col, Descriptions, Image, Layout, Menu, Row} from 'antd';
import Title from "antd/es/typography/Title";

const {SubMenu} = Menu;

const {Header, Footer, Sider, Content} = Layout;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedPlatform: props.platforms[0],
      selectedItem: props.platforms[0].platformItems[0],
    }
  }

  handleMenuClick = (event) => {
    console.log(event);
    this.setState({
      selectedPlatform: event.item.props.platformvalue,
      selectedItem: event.item.props.itemvalue || event.item.props.platformvalue[0],
    })
  }

  render() {
    return (
      <Layout id="mainView">
        <Content className="topContent">
          <Title className="centered">Top 10 moich ulubionych</Title>
        </Content>
        <Header>
          <div className="navMenu">
            <Menu className="navMenu"
                  mode="horizontal"
                  selectedKeys={[this.state.selectedPlatform.platformName, this.state.selectedItem.name]}
                  onClick={this.handleMenuClick}>
              {
                this.props.platforms.map(
                  platform =>
                    <SubMenu key={platform.platformName} title={platform.platformName} onTitleClick={() => {
                      if (this.state.selectedPlatform !== platform) {
                        this.setState({
                          selectedPlatform: platform,
                          selectedItem: platform.platformItems[0],
                        })
                      }
                    }}>
                      {
                        platform.platformItems.map(
                          item =>
                            <Menu.Item key={item.name} itemvalue={item} platformvalue={platform}>{item.name}</Menu.Item>
                        )
                      }
                    </SubMenu>
                )
              }
            </Menu>
          </div>
        </Header>
        <Layout>
          <Sider theme="light">
            <p className="centered">Top 10:</p>
            <Menu mode="vertical" selectedKeys={[this.state.selectedItem.name]} onClick={this.handleMenuClick}>
              {
                this.state.selectedPlatform.platformItems.map(
                  item =>
                    <Menu.Item key={item.name} itemvalue={item}
                               platformvalue={this.state.selectedPlatform}>{item.name}</Menu.Item>
                )
              }
            </Menu>
          </Sider>
          <Content>
            <Title className="centered">{this.state.selectedPlatform.platformName}</Title>
            <div>
              <Row>
                <Col span={6} id="image">
                  <Image src={this.state.selectedItem.img}/>
                </Col>
                <Col span={18} id="description">
                  <Descriptions title={this.state.selectedItem.name} bordered column={1}>
                    {
                      this.state.selectedItem.metadata.map(
                        metadata =>
                          <Descriptions.Item label={metadata.name}>{metadata.value}</Descriptions.Item>
                      )
                    }
                  </Descriptions>
                  <p className="description">{this.state.selectedItem.description}</p>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
        <Footer style={{textAlign: "center"}}>Dominika Gajewska 2021</Footer>
      </Layout>
    )
  }
}

export default App;
