import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
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
        .then(data=> console.log(data))
    };
    return (
        <div>
            <h2>Add your product here</h2>
            <form  onSubmit={handleSubmit(onSubmit)}>
                

                <input name="productName" placeholder="Product Name:" ref={register({ required: true })} /> <br/>
                {errors.productName && <span>This field is required</span>}

                <input name="writer" placeholder="Writer" ref={register({ required: true  })} /> <br/>
                {errors.writer && <span>This field is required</span>}

                <input name="price" placeholder="Price" ref={register({ required: true, pattern: /^[0-9]*$/  })} /> <br/>
                {errors.price && <span>This field is required</span>}
                
                <input onChange={handleImage} type="file" name="image" ref={register({ required: true })} /> <br/> <br/>
                {errors.image && <span>This field is required</span>}

                
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;