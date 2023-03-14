
import { Button,Form, Input, Select,Tag} from 'antd';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../img/logo.PNG"

const UserEditForm = () => {
    const USER_MANAGEMENT_API = "http://localhost:8080/api/v1/users";
    const ROLE_MANAGEMENT_API = "http://localhost:8080/api/v1/roles"
    const { userId } = useParams();
    const isCreate = !userId;

    const token = localStorage.getItem("accessToken");

    const [photo, setPhoto] = useState(null);

    const onFileChange = (event) => {
      setPhoto(event.target.files[0]);
    };
 
 
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

    useEffect(() => {
      if (userId) {
        axios
        .get(`${USER_MANAGEMENT_API}/${userId}`,config)
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
          throw err;
        });
      }
    },[]);

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

    const defaultRole = async () => user?.roles?.map(role => role.description);

    const tagRender = (props) => {
      const { label, value, closable, onClose, id } = props;
      const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          id={id}
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
  
    const handleChange = async (event, type) => {
        const value = event.target ? event.target.value : event;
        setUser(prevState => ({
          ...prevState,
          [type || event.target.name]: value
        }));
      };

      // const addRoles = (id) => {
      //   if(!user.roles.includes(id)) {
      //     setUser(prevState => ({
      //       ...prevState,
      //       roles: [...user.roles, id] 
      //     }));
      //   }
       
      // }
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
        const formData = new FormData();
        formData.append("file", photo, photo.name);
        axios.post(`http://localhost:8080/api/v1/users/uploadFile`, formData);

        axios
          .put(`http://localhost:8080/api/v1/users`, user, config)
          .then(res => {
             alert(
              `Edit successfully!!!`
            );
            window.location.href = "/home/users";
          })
          .catch(err => {
            throw err;
          });
      }



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
      <h1 style={{ textAlign: "center", marginTop: 5}}>Edits user</h1>
      <Form.Item label="Full name">
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
        className="form-control"
        type="text"
        onChange={handleChange}
        value={user.username}
        name="username" /> 
      </Form.Item>
      <Form.Item label="Email">
        <Input
        className="form-control"
        type="text"
        onChange={handleChange}
        value={user.email}
        name="email" />
      </Form.Item>
      <Form.Item label="Photo">
        <input
          type="file"
          accept='.png'
          className="form-control"
          name="photo"
          onChange={onFileChange}
        />

        {photo && (
          <img src={URL.createObjectURL(photo)} width="40" alt="Selected File" />
        )}
      </Form.Item>
      <Form.Item label="Position">
      <Select 
      onChange={addRoles}
    mode="multiple"
    showArrow
    tagRender={tagRender}
    defaultValue={defaultRole}
    style={{
      width: '100%',
    }}
    options={roles}
  />
  </Form.Item>
      <Form.Item label="Status">
        <Select
        defaultValue={true}
        onChange={(value)=>{
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

export default UserEditForm;

function getProducts() {
    window.location.href = "/home/users";
}


