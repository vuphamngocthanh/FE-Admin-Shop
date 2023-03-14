import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Space, theme , Input} from "antd";
import CustomTable from "../common/Table";

export default function Products() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();  
  const {Search} = Input;

  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("accessToken");



  const config = {
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };


  const columns = [
    {
      title: "ID",
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
    }
    ,
    {
      title: 'Product name',
      dataIndex: 'nameProduct',
      key: 'nameProduct'
    },
    {
      title: 'Fabric Material',
      dataIndex: 'fabricMaterial',
      key: 'fabricMaterial'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Category',
      dataIndex: 'categoryDto',
      key: 'categoryDto',
      render: (categoryDto) => (
        <span>{categoryDto.name}</span>
      ),
    },
    {
      title: 'Size',
      dataIndex: ['productSizeDtos'],
      key: 'size',
      render: (productSizeDtos) => (
          <>
            {productSizeDtos.map((productSizeDto) => (
              <span>{productSizeDto.size}, </span>
            ))}
          </>
      ),
    },
    {
      title: 'Color',
      dataIndex: ['productColorDtos'],
      key: 'color',
      render: (productColorDtos) => (
        <>
          {productColorDtos.map((productColorDto) => (
            <span>{productColorDto.color}, </span>
          ))}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, product) => (
        <Space wrap size="middle">
          <a href={`edit-product/${product.id}`}>
            <Button danger>Update</Button>
          </a>
          <a href={`view-product/${product.id}`}>
            <Button type="primary" ghost>View</Button>
          </a>
        </Space>
      ),
    },
  ]
 

  useEffect(() => {
    if (products.length === 0) {
        loadProducts();
    }
  },[products]);

  const handleSearch = async (value) =>{
    const result = await axios.get(`http://localhost:8080/api/v1/products?search=${value}`, config);
    setProducts(result.data);
  }

  const loadProducts = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/products?search`, config);
    setProducts(result.data);
  };

  return (

    <div theme='dark'
      style={{
        padding: 24,
        textAlign: 'center',
        background: colorBgContainer,
        
      }}
    >

    <Search placeholder="input search text" allowClear 
      size="middle" onSearch={handleSearch} enterButton />

   <CustomTable theme= "dark" data = {products} columns={columns}/>
   </div>
  );
  
}
