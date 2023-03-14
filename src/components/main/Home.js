import React from "react";
import { Outlet } from "react-router-dom";
import { Breadcrumb, Layout} from 'antd';
import SideBav from "../common/SideBav";
import Navbar from "../common/NavBar";


const { Header,Sider, Footer } = Layout;


function SLayout(){
    
    return (
        
        <div>
    <Layout >
        <Sider>
            <SideBav style={{marginTop: 300}}/>
        </Sider>
      <Layout>
      <Header className="header">
        <Navbar/>
      </Header>
          <Breadcrumb style={{ marginTop: 16, marginLeft:10 }}>
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/home/users">List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

              <Outlet />
        
          <Footer style={{textAlign: 'center', }}>Fresh Stars @2023</Footer>
      </Layout>
    </Layout> 
            </div>
    );
};

export default SLayout;
