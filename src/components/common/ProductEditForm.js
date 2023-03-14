import axios from "axios";
import {Button,Form, Input, Select} from 'antd';
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../img/logo.PNG";

export default function ProductEditForm() {
  let navigate = useNavigate();

  const {productId} = useParams();


  const token = localStorage.getItem("accessToken");

 
 
  const config = {
   'headers': {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*'
   }
  };

  const [productSizes, setProductSize] = useState([]);
  const [productColors, setProductColor] = useState([]);
  const [categories, setCategory] = useState([]);

  const [product, setProduct] = useState({
    id:'',
    nameProduct: '',
    price: '', 
    fabricMaterial: '',
    detailedDescription: '', 
    photo: '', 
    productSizeDtos: [], 
    productColorDtos: [], 
    categoryDto: []
  });

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
    loadProductSizes();
    loadProductColors();
    loadCategories();
  }, []);


  const addproductSizeDtos = (id) => {
    if (!product.productColorDtos.includes(id)) {
      const sizeId = id.map((sizeId) => ({ id: sizeId }));
      if(product.productSizeDtos.id !== null || product.productSizeDtos.id !== []){
        setProduct(prevState => ({
          ...prevState,
          productSizeDtos: sizeId
        }));
      }else{
        const sizeIdResponce = product.productSizeDtos.id.map((sizeId) => ({ id: sizeId }));
        setProduct(product => ({
          ...product, productSizeDtos: sizeIdResponce
        }));
      }
    }
  }

  const addproductcolorDtos = (id) => {
    const colorId = id.map((colorId) => ({ id: colorId }));
    if (!product.productColorDtos.includes(id)) {
      if(product.productColorDtos.id !== null || product.productColorDtos.id !== []){
        setProduct(prevState => ({
          ...prevState,
          productColorDtos: colorId
        }));
      }else{
        const colorIdResponce = product.productColorDtos.id.map((colorId) => ({ id: colorId }));
        setProduct(product => ({
          ...product, productColorDtos: colorIdResponce
        }));
      }
    }
  }
  
  const addCategory = (newId) => {
    if(product.categoryDto.id !== newId) {
      if(product.categoryDto.id !== null || product.categoryDto.id !== []){
        const cateId = [newId].map((catId) => ({id: catId}))[0];
        setProduct(product => ({
          ...product, categoryDto: cateId
        }));
      }else{
        const cateIdResponce = product.categoryDto.id.map((catId) => ({id: catId}))[0];
        setProduct(product => ({
          ...product, categoryDto: cateIdResponce
        }));
      } 
    }
  }

  const [photoUpload, setPhotoUpload] = useState(null);


  const onFileChange = (event) => {
    setPhotoUpload(event.target.files[0]);
  };
  
  const loadProductSizes = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/product-sizes",config);
    setProductSize(result.data);
  };
  const loadProductColors = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/product-colors",config);
    setProductColor(result.data);
  };
  const loadCategories = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/categories",config);
    setCategory(result.data);
  };
  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/products/${productId}`,config);
    setProduct(result.data);
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    if(formData == null) {
          const response = await axios.put(`http://localhost:8080/api/v1/products`,  product, config);
        alert(
          ` ${JSON.stringify(
            response.data
          )}`
        );
        navigate("/home/products");
      }
    else{
        formData.append("file", photoUpload);
        await axios.post(`http://localhost:8080/api/v1/products/uploadFile`,  formData);
        const response = await axios.put(`http://localhost:8080/api/v1/products`,  product, config);
        alert(
          ` ${JSON.stringify(
            response.data
          )}`
        );
        navigate("/home/products");
      };
    
  }
    

  function getProducts() {
    window.location.href = "/home/products";
}
  

  return (
    <div className="container">
      <div className ="form-wrapper" > 
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
    

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
              <h1 style={{ textAlign: "center", marginTop: 5, color:"rgb(240, 227, 121)"}}>Edit product</h1>
                <Form.Item label="Product name">
                <Input
                    className="form-control"
                    type="text"
                    onChange={onInputChange}
                    value={product.nameProduct}
                    name="nameProduct" /> 
                </Form.Item>
                <Form.Item label="Price">
                <Input
                  className="form-control"
                  type="text"
                  onChange={onInputChange}
                  value={product.price}
                  name="price" /> 
                </Form.Item>
                <Form.Item label="Fabric Material">
                  <Input
                    className="form-control"
                    type="text"
                    onChange={onInputChange}
                    value={product.fabricMaterial}
                    name="fabricMaterial" /> 
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    className="form-control"
                    type="text"
                    onChange={onInputChange}
                    value={product.detailedDescription}
                    name="detailedDescription" /> 
                </Form.Item>

                {/* <Form.Item label="old Avatar">
                    <img src={"http://localhost:8080"+product.photo} width="40" alt="Selected File" />

                </Form.Item> */}
                <Form.Item label="new avatar">
                    <input
                      type="file"
                      className="form-control"
                      name="photoUpload"
                      onChange={onFileChange}
                    />

                    {photoUpload && (
                      <img src={URL.createObjectURL(photoUpload)} width="40" alt="Selected File" />
                    )}
                  </Form.Item>

                  <Form.Item label="lưu ý:" style={{color: "red"}}>
                    if does not have a j change,  No need to re-enter the information below, thank you!!!
                  </Form.Item>

                  <Form.Item label="old Size" >
                      {product.productSizeDtos.map((size) => {
                          return <span key={size.id} value={size.id}>{size.size} &ensp;</span>
                      })}
                  </Form.Item>

                 <Form.Item label="new Size">
                   <Select  mode="multiple" onChange={(value)=>{
                           addproductSizeDtos(value)}}>
                           {productSizes.map((size) => ( 
                      <Select.Option key={size.id} value={size.id}>{size.size}</Select.Option>
                     ))}
                   </Select>
                 </Form.Item>

                  <Form.Item label="old Color">
                      {product.productColorDtos.map((color) => {
                          return <span key={color.id}>{color.color} &ensp;</span>
                      })}
                  </Form.Item>
                 
                  <Form.Item label="new Color ">
                    <Select mode="multiple" onChange={(value)=>{
                        addproductcolorDtos(value)}}>
                      {productColors.map((color) => ( 
                    <Select.Option key={color.id} value={color.id} >{color.color}</Select.Option>
                  ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="old Category" onChange={(value)=>{
                        addCategory(value)}}>
                        <span> &ensp; {product.categoryDto.name}</span>
                  </Form.Item>

                  <Form.Item label="Category">
                    <Select onChange={(value)=>{
                        addCategory(value)}}>   

                      {categories.map((category) => ( 
                        <Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                <div style={{textAlign:'center', paddingBottom:10}}>
                  <Button style={{width:90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)"}} onClick={onSubmit} type="primary" >Submit</Button>        
                  <Button style={{width: 90,backgroundColor: "rgb(28, 28, 52)", color: "rgb(240, 227, 121)",marginLeft:10}}  onClick={getProducts}  type="primary" danger>Back</Button>
                </div>
             </Form>
          </div>
      </div>
    </div>
  );
}
