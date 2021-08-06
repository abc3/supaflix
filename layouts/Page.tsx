import React from "react";
import Head from "./Head";
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from 'antd';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";

const { Header, Content, Footer, Sider } = Layout;

const userMenu = (
  <Menu>
    <Menu.Item>
      <a href="#">Settings</a>
    </Menu.Item>
    <Menu.Item>
      <a href="#">Log out</a>
    </Menu.Item>
  </Menu>
);

class SettingsOutlined extends React.Component {
  render() {
    return null;
  }
}

const Page: React.FC = (props) => {
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState('errors')
  useEffect(() => {
    if (router.pathname == '/') {
      setActiveMenu('errors')
    } else {
      setActiveMenu(router.pathname.substring(1))
    }
  }, [])
  return (
  <Layout style={{ minHeight: '100vh' }}>
    <Head {...props} />

    <Layout className="site-layout">
      <Header style={{ padding: 0, backgroundColor: '#fff' }}>
          <Link as={`/`} href={"/index"}>
          <a style={{ marginLeft: 30, textAlign: 'left', color: '#e50914', fontSize: 24, fontWeight: 'bold'}}>
            Supaflix
          </a>
          </Link>
      </Header>
      <Content style={{ margin: '0 16px' }}>
        <div className="site-layout-background" style={{ padding: 12, paddingTop: 0, minHeight: 360, maxWidth: 1200 }}>
          {props.children}
        </div>
      </Content>
        <Footer style={{ textAlign: 'center' }}>The Supabase Hackathon 2021</Footer>
    </Layout>
  </Layout>
)}

export default Page;

