import { Checkbox,Button,Form, Input, Select,Tag} from 'antd';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../img/logo.PNG";

export default function CreateProduct() {
  const PRODUCT_MANAGER_API = "http://localhost:8001/api/v1/products";
  const { productId } = useParams();

  const isCreate = !productId;

  const token = localStorage.getItem("accessToken");
 
  const config = {
   'headers': {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin': '*'
   }
  };

  const [product, setProduct] = useState({
    nameProduct: '',
    price: '', 
    fabricMaterial: '',
    detailedDescription: '', 
    photo: '', 
    productSizeDtos: [], 
    productColorDtos: [], 
    categoryDto: []
  });
  
  const [productSizes, setProductSize] = useState([]);
  const [productColors, setProductColor] = useState([]);
  const [categories, setCategory] = useState([]);


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
  

  const onInputChange = (e, type) => {
    const value = e.target ? e.target.value : e;
    setProduct(product => ({ ...product, [type || e.target.name]: value }));
  };

  const addproductSizeDtos = (id) => {
    if (!product.productColorDtos.includes(id)) {
      const sizeId = id.map((sizeId) => ({ id: sizeId }));
      setProduct(prevState => ({
        ...prevState,
        productSizeDtos: sizeId
      }));
    }
  }

  const addproductcolorDtos = (id) => {
    const colorId = id.map((colorId) => ({ id: colorId }));
    if (!product.productColorDtos.includes(id)) {
      setProduct(prevState => ({
        ...prevState,
        productColorDtos: colorId
      }));
    }
  }
  
  const addCategory = (newId) => {
    if(product.categoryDto.id !== newId) {
      const cateId = [newId].map((catId) => ({id: catId}))[0];
      setProduct(product => ({
        ...product, categoryDto: cateId
      }));
    }
  }

  const [photoUpload, setPhoto] = useState(null);

  const onFileChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  useEffect(() => {
    loadProductSizes();
    loadProductColors();
    loadCategories();
  }, []);

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


  console.log(product);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", photoUpload, photoUpload.name);
    await axios.post(`http://localhost:8080/api/v1/products/uploadFile`, formData);

    const response = await axios.post(`http://localhost:8080/api/v1/products/add`, product,config,{
      headers: {
          'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => {
        console.log(res);
        alert(
          `${isCreate ? "Create" : "Edit"} product ${JSON.stringify(
            res.data
          )} successfully!!!`
        );
        window.location.href = "/home/products";
      })
      .catch(err => {
        throw err;
      });
  };


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
              <h1 style={{ textAlign: "center", marginTop: 5, color:"rgb(240, 227, 121)"}}>Create new product</h1>
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
                <Form.Item label="Tải Hình ảnh">
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
                 <Form.Item label="Size">
                   <Select mode="multiple" onChange={(value)=>{
                           addproductSizeDtos(value)}}>
                           {productSizes.map((size) => ( 
                      <Select.Option key={size.id} value={size.id}>{size.size}</Select.Option>
                     ))}
                   </Select>
                 </Form.Item>
                <Form.Item label="Color">
                  <Select mode="multiple" onChange={(value)=>{
                      addproductcolorDtos(value)}}>
                    {productColors.map((color) => ( 
                  <Select.Option key={color.id} value={color.id}>{color.color}</Select.Option>
                ))}
                   </Select>
                </Form.Item>      
                <Form.Item label="Category">
                  <Select  onChange={(value)=>{
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
