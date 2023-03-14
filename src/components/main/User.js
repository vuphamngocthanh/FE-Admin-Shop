import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Space, theme, Input} from 'antd';
import CustomTable from "../common/Table";
import Search from "antd/es/transfer/search";

function Users(){

  const {
    token: { colorBgContainer },
  } = theme.useToken();  


  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    // loadUsers();
  }


    const [users, setUsers] = useState([]);

   const token = localStorage.getItem("accessToken");
   console.log("token 3: " + token);


   const config = {
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/users?name=${searchValue}`, config)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, [searchValue]);
      

    // useEffect(() => {
    //     if (users.length === 0) {
    //         loadUsers();
    //     }
    // },[users]);

    // const loadUsers = async () => {
    //   let url = `http://localhost:8080/api/v1/users?name=${searchValue}`;
    //   // if (searchValue) {
    //   //   url += `/?name=${searchValue}`;
    //   // }
    //   const result = await axios.get(url, config);
    //   setUsers(result.data);
    //   console.log(result.data);
    // };
    

    // const loadUsers = async () => {
    //   console.log(config);
    //     const result = await axios.get("http://localhost:8080/api/v1/users",  config);
    //     setUsers(result.data);
    //     console.log(result.data);
    // };

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
          title: 'Avatar',
          dataIndex: 'photo',
          key: 'photo',
          render: (photo) => (
            <img
              src={"http://localhost:8080"+photo}
              alt="Avatar"
              style={{ width: '70px', height: '70px' }}
            />
          ),
        },
      {
        title: 'Full name',
        dataIndex: 'fullname',
        key: 'fullname',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Position',
        dataIndex: ['roles', 0, 'description'],
        key: 'role',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, user) => (
          <Space wrap size="middle">
            <a href={`edit-user/${user.id}`}>
              <Button danger>Update</Button>
            </a>
            <a href={`user-detail/${user.id}`}>
              <Button type="primary" ghost>Detail</Button>
            </a>
          </Space>
        ),
      },
    ];
  
    return (
      <div theme='dark'
      style={{
        padding: 24,
        textAlign: 'center',
        background: colorBgContainer,
        marginTop:'5%'
        
      }}
    >
      <Input.Search placeholder="input search text" onSearch={handleSearch} />
     
      
    
    
     <CustomTable theme= "dark" data = {users} columns={columns}/>
     </div>

    );
};

export default Users;
