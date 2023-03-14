
    import { Button, Form, Input, Select, Tag } from 'antd';
    import React, { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import logo from "../../img/logo.PNG";
    
    const EditForm = () => {
      const USER_MANAGEMENT_API = "http://localhost:8080/api/v1/users";
      const { userId } = useParams();
      const isCreate = !userId;
    
      const token = localStorage.getItem("accessToken");
    
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
    
      const [user, setUser] = useState({
        fullname: "",
        username: "",
        password: "",
        email: "",
        photo: "",
        roles: [],
        status: "",
      });
      const [roles, setRoles] = useState([]);
    
      const tagRender = (props) => {
        const { label, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
          event.preventDefault();
          event.stopPropagation();
        };
        return (
          <Tag
            color={"blue"}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
              marginRight: 3,
            }}
          >
            {label}
          </Tag>
        );
      };
    
      useEffect(() => {
        if (userId) {
          axios
            .get(`${USER_MANAGEMENT_API}/${userId}`, config)
            .then((res) => {
              setUser(res.data);
            })
            .catch((err) => {
              throw err;
            });
        }
      }, []);
    
    
      const handleSubmit = () => {
        axios
          .delete(`${USER_MANAGEMENT_API}/${userId}`, config)
          .then((res) => {
            alert(
              `Remove successfully!!!`
            );
           
            window.location.href = "/home/users";
          })
          .catch((err) => {
            throw err;
          });
      };


 return (
    <div className="container" style={{marginTop: '5%'}} >
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
      <h1 style={{ textAlign: "center", marginTop: 5}}>User detail</h1>
      <Form.Item label="Full name">
        <Input readOnly
        style={{width:'100%'}}
        className="form-control"
        type="text"
        value={user.fullname}
        name="fullname" />
      </Form.Item>
      <Form.Item label="Username">
        <Input readOnly
        className="form-control"
        type="text"
        value={user.username}
        name="username" /> 
      </Form.Item>
      <Form.Item readOnly label="Email">
        <Input
        className="form-control"
        type="text"
        value={user.email}
        name="email" />
      </Form.Item>
      <Form.Item readOnly label="Photo">
        <Input
        className="form-control"
        type="text"
        value={user.photo}
        name="photo" />
      </Form.Item>
      <Form.Item readOnly label="Position">
      <Select 
    mode="multiple"
    showArrow
    tagRender={tagRender}
    value={roles.id}
    style={{
      width: '100%',
    }}
    options={roles}
  />
  </Form.Item>
      <Form.Item label="Status">
        <Select readOnly
        defaultValue={true}
      >
          <Select.Option value="true">Active</Select.Option>
          <Select.Option value="false">Inactive</Select.Option>
        </Select>
      </Form.Item>
    
      <div style={{textAlign:'center', paddingBottom:10}}>
        <Button style={{width:90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}} onClick={handleSubmit} type="primary" >Delete</Button>        
        <Button style={{width: 90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)",marginLeft:10}}  onClick={getProducts}  type="primary" danger>Back</Button>
      </div>
    
    </Form>
    </div>
    </div>
  );
};

export default EditForm;

function getProducts() {
    window.location.href = "/home/users";
}


