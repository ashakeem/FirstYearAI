import { useState } from 'react';
import {
  PlusCircleOutlined,
  FileOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
  AntDesignOutlined

} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import CardComponent from '../components/ui/CardComponent';
import Avatar from 'antd/es/avatar/avatar';

import Search from 'antd/es/input/Search';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Dashboard', '1', <PieChartOutlined />),
  getItem('New', '2', <PlusCircleOutlined/>),
  getItem('Resume', '3', <FileOutlined />),

  getItem('Profile', '4', <UserOutlined />),
  getItem('Settings', '5', <SettingOutlined />),

];
const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className='text-lg font-bold' />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
      <div className=' flex justify-between items-center space-x-2 p-4 max-w-[50%]'>
          <Search className='' placeholder="input search text" enterButton="Search"  size="large"  />
          <Avatar
    size={{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 100 }}
    icon={<UserOutlined />}
  />
        </div>
        
      
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4">
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          FirstYear.ai ©{new Date().getFullYear()} Created by Ayomide Hakeem
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;