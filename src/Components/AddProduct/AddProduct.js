import { Button } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import PublishIcon from '@material-ui/icons/Publish';
import './AddProduct.css';

const AddProduct = () => {
    const history=useHistory();
    const [imageURL,setImageURL]= useState(null);
    const handleImage=(event)=>{
        const imageData= new FormData();
        imageData.set('key','eb8c2def80cfa23ce98abf23a6d90ef1');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.image.url);
          })
          .catch(function (error) {
            console.log(error);
          });

    }
   
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        const productData={
            productName: data.productName,
            writer: data.writer,
            price: data.price,
            image: imageURL
        }
        fetch('https://afternoon-tor-79198.herokuapp.com/addProduct',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(productData)
        })
        .then(res=>res.json())
        .then(data=> {
            alert("New data inserted successfully");
            history.push('/admin');
        })
    };
    return (
        <div style={{width: '70%',margin: 'auto',boxShadow: '5px 5px 20px grey',padding: '20px',marginTop: '100px'}}>
            <form className="product-form"  onSubmit={handleSubmit(onSubmit)}>
                

                <input name="productName" placeholder="Product Name:" ref={register({ required: true })} /> 
                {errors.productName && <span>This field is required</span>}

                <input name="writer" placeholder="Writer" ref={register({ required: true  })} /> 
                {errors.writer && <span>This field is required</span>}

                
                <input name="price" placeholder="Price" ref={register({ required: true, pattern: /^[0-9]*$/  })} /> 
                {errors.price && <span>This field is required</span>}

                <div style={{justifySelf:'start'}}>
                    <label for="fileUpload" className="custom-file-upload">
                       <PublishIcon /> <span style={{position: 'relative',bottom: '5px'}}>Upload Book Image</span>
                    </label>
                    <input  id="fileUpload" onChange={handleImage} type="file" name="image" ref={register({ required: true })} /> <br/> 
                    {errors.image && <span>This field is required</span>}
                </div>
                
                <Button type="submit" variant="contained" color="primary"style={{width: '30%',margin: 'auto',marginTop: '30px'}}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default AddProduct;