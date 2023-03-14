
import { Button,Form, Input, Select,Tag} from 'antd';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../img/logo.PNG"

const CreateForm = () => {
    const USER_MANAGEMENT_API = "151.106.109.212:9090/admin/api/v1/users";
    const ROLE_MANAGEMENT_API = "151.106.109.212:9090/admin/api/v1/roles"
    const { userId } = useParams();
    const isCreate = !userId;

    const token = localStorage.getItem("accessToken");
    
 
 
    const config = {
     'headers': {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*'
     }
   };
    const [user, setUser] = useState({
        fullname: '',
        username: '',
        password: '',
        email: '',
        photo: '',
        roles: [],
        status: ''
      });
    const [roles, setRoles] = useState([]);

    const tagRender = (props) => {
      const { label, value, closable, onClose } = props;
      const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{
            marginRight: 3,
            backgroundColor:"rgb(28, 28, 52)",
            color:'rgb(240, 227, 121)'
          }}
        >
          {label}
        </Tag>
      );
    };

    // get all roles in db and set to roles state
    useEffect(() => async () => {     
      await axios
      .get(`${ROLE_MANAGEMENT_API}`,config)
      .then(async res => {
        const rolesFromServer = res.data;
        setRoles(rolesFromServer.map(role => {
          role.value = role.id;
          role.label = role.description;
          return role;
      }));
      })
      .catch(err =>{
        throw err;
      })
    },[])
  
    const handleChange = async (event, type) => {
        const value = event.target ? event.target.value : event;
        setUser(prevState => ({
          ...prevState,
          [type || event.target.name]: value
        }));
      };


      const addRoles = (value) => {
        const roleId = parseInt(value); // chuyển giá trị value từ string sang number
        const selectedRole = roles.find(role => role.id === roleId);
        if(selectedRole && !user.roles.find(role => role.id === roleId)) {
          setUser(prevState => ({
            ...prevState,
            roles: [...prevState.roles, selectedRole] 
          }));
        }
      }

      
    function handleSubmit() {
      axios
        .post(`${USER_MANAGEMENT_API}`, user, config)
        .then(res => {
          alert(
            `New user is create successfully!!!`
          );
          window.location.href = "/home/users";
        })
        .catch(err => {
          throw err;
        });
    }


 return (
    <div className="container" style={{marginTop: 0}} >
  <div className ="form-wrapper" >  
    <Form
      
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      layout="horizontal"
      style={{width:'40%',height:'20%',
        margin: 'auto',border:'solid' }}
   
    >
      <div style={{paddingTop: 10, display: 'flex', justifyContent: 'center', alignItems: "center"}}>
              <img
              
                alt="logo GMS"
                src={logo}
                style={{ marginBottom: 20, borderRadius:20}}
                width={150}
              />
              </div>
      <h1 style={{ textAlign: "center", marginTop: 5}}>Create new user</h1>
      <Form.Item  
        label="Full name" 
        rules={[
          {
            required: true,
            message: 'Please input your full name!',
          },
        ]}>
        <Input
        style={{width:'100%'}}
        className="form-control"
        type="text"
        onChange={handleChange}
        value={user.fullname}
        name="fullname" />
      </Form.Item>
      <Form.Item label="Username">
        <Input
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        className="form-control"
        type="text"
        onChange={handleChange}
        value={user.username}
        name="username" /> 
      </Form.Item>
            <Form.Item 
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input
          className="form-control"
          type="text"
          onChange={handleChange}
          value={user.password}
          name="password" 
        />
      </Form.Item>
      <Form.Item
      rules={[
        {
          required: true,
          message: 'Please input your Email!',
        },
      ]}
      label="Email">
        <Input
        
        className="form-control"
        type="text"
        onChange={handleChange}
        value={user.email}
        name="email" />
      </Form.Item>
      <Form.Item label="Photo">
        <Input
        className="form-control"
        type="text"
        onChange={handleChange}
        value={user.photo}
        name="photo" />
      </Form.Item>
      <Form.Item label="Position">
      <Select 
      onChange={addRoles}
    mode="multiple"
    showArrow
    tagRender={tagRender}
    style={{
      width: '100%',
    }}
    options={roles}
  />
  </Form.Item>
      <Form.Item label="Status">
        <Select onChange={(value)=>{
            handleChange(value, "status")
        }}>
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>
      </Form.Item>
    
      <div style={{textAlign:'center', paddingBottom:10}}>
        <Button style={{width:90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}} onClick={handleSubmit} type="primary" >Submit</Button>        
        <Button style={{width: 90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)",marginLeft:10}}  onClick={getProducts}  type="primary" danger>Back</Button>
      </div>
    
    </Form>
    </div>
    </div>
  );
};

export default CreateForm;

function getProducts() {
    window.location.href = "/home/users";
}


