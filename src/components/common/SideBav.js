import {Switch,  Menu, Layout } from 'antd';
import {  ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import logo from "../../img/logo.PNG"


import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const {Sider} = Layout;
 
const navItems = [
  {
    text: 'Users',
    icon: <UserOutlined/>,
    children:[
      {
        text: 'User list',
        icon:<UserOutlined/>,
        link:'home/users'
      },
      {
        text: 'Add user',
        icon:<UserOutlined/>,
        link:'home/create-user'
      }
    ]
},
{
  text: 'Products',
  icon: <ShoppingCartOutlined/>,
  children:[
    {
      text:'Product list',
      icon:<ShoppingCartOutlined/>,
      link:'home/products'
    },
    {
      text:'Add product',
      icon:<ShoppingCartOutlined/>,
      link:'home/create-product'
    }
  ]
}]


const SideBav = () => {
  const [theme, setTheme] = useState('dark');
  const [current, setCurrent] = useState('1');

  const navigate= useNavigate()
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <>
      <Switch
        checked={theme === 'light'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div>
        <img
        alt="logo GMS"
        src={logo}
        style={{ marginBottom: 20}}
        width={200}
        height={170}
      /></div>
           <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {navItems.map((navItem, index) => (
        <Menu.SubMenu key={`sub${index}`} icon={navItem.icon} title={navItem.text}>
          {navItem.children.map((child, childIndex) => (
            <Menu.Item 
              key={`sub${index}-${childIndex}`} 
              icon={child.icon}
              onClick={() => {
                navigate(`/${child.link}`)
              }}  
            >
              {child.text}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
      </Sider>
    </>
  );
};


export default SideBav;