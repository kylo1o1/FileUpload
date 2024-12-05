import React, { useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import * as formik from 'formik'
import * as yup from 'yup'
import './RegProduct.css'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'


const RegProduct = () => {


    const [imageField, setImageField]  = useState([])

    


    const {Formik} = formik
    const schema  = yup.object().shape({
        name:yup.string().required("Please enter Products name"),
        category:yup.string().required("please enter "),
        description:yup.string().required(),
        price:yup.string().required(),
        // img:yup.mixed()

    })

    const addFields = ()=>{
        setImageField((prev)=> [...prev,[]])
    }

    const handleFileChange = (e,index)=>{

        const file = Array.from(e.target.files)
        const prevs = [...imageField]
        prevs[index] = file
        setImageField(prevs)

        
    }

    const handleRemoveImage = (index)=>{
        console.log(index)
        const updatedProducts = [...imageField]
        updatedProducts.splice(index,1)
        setImageField(updatedProducts);
        
    }

    const handleProductRegister = async (data)=>{
        const   {name,  category,   description,    price} = data
        try {
            const formData = new FormData()

            formData.append('name',name);
            formData.append('category',category);
            formData.append('description',description);
            formData.append('price',price);

            imageField.forEach((file)=>{
                if(file && file[0]){
                formData.append('files',file[0])

                }
            })
            console.log(formData)


            const res =  await axios.post('http://localhost:4444/registerProduct',formData,{withCredentials:true})
            if(res.data.success){
                toast.success((res.data.message),
                {
                 position:"top-right",
                 autoClose: 1000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
                 transition: Bounce,

               })
            }else{
                toast.error((res.data.message),
                {
                 position:"top-right",
                 autoClose: 1000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
                 transition: Bounce,

               })
            }

        } catch (error) {
            toast.error((error.message),
                {
                 position:"top-right",
                 autoClose: 1000,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
                 transition: Bounce,

               })
        }
    }


  return (
    <Container>
        <Row className='justify-content-center'>
            <Col md={2}>
                <h2>Add a Product</h2>
            </Col>
        </Row>
        <Row className='justify-content-center'>
            <Col md={7}>
                <Formik
                validationSchema={schema}
                onSubmit={handleProductRegister}
                initialValues={{
                    name:'',
                    category:'',
                    description:'',
                    price:'',
                    img:null
                }}
                >
                 {({ setFieldValue,handleSubmit, handleChange, values, touched, errors }) =>(
                    <Form noValidate   encType='multipart/form-data' method='post' onSubmit={handleSubmit}>
                        <Form.Group className='mb-3'>
                            <FloatingLabel controlId='floatingName' label='Product Name'>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Products name"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                                isValid={touched.name && !errors.name}
                                isInvalid={!!errors.name}
                                autoComplete='fullname'
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <FloatingLabel controlId='floatingCat' label='Product Category'>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Products category"
                                name="category"
                                onChange={handleChange}
                                value={values.category}
                                isValid={touched.category && !errors.category}
                                isInvalid={!!errors.category}
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        
                        <Form.Group className='mb-3'>
                            <FloatingLabel controlId='floatingDesc' label='Product Description'>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Products description"
                                name="description"
                                onChange={handleChange}
                                value={values.description}
                                isValid={touched.description && !errors.description}
                                isInvalid={!!errors.description}
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className='mb-3'>
                            <FloatingLabel controlId='floatingPrice' label='Product Price'>
                            <Form.Control
                                type="text"
                                placeholder="Enter Your Products price"
                                name="price"
                                onChange={handleChange}
                                value={values.price}
                                isValid={touched.price && !errors.price}
                                isInvalid={!!errors.price}
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                        

                        {imageField.map((file,index)=>(
                            <Form.Group className='mb-3 d-flex 'key={`file-input-${index}`}>
                                <FloatingLabel controlId='floatingImg' label={`Product Image ${index + 1}` } className='w-100'>
                                <Form.Control
                                    type="file"
                                    name='img'
                                    key={file ? file.name : `file-input-${index}`} // Force re-render on remove
                                    onChange={(e) => handleFileChange(e, index)}
                                />    
                                
                                </FloatingLabel>
                                <Button variant="outline-danger" id="button-addon2" onClick={()=>handleRemoveImage(index)}>
                                    Remove
                                </Button>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    {errors.img}
                                </Form.Control.Feedback>
                            </Form.Group>
                        ))}


                        <Col className='mb-3'>
                            <Button variant='success' className='w-100' onClick={addFields} type='button' >
                                Add  Image
                            </Button>
                        </Col>
                        
                        <div className='d-flex justify-content-center'>
                        <Button variant='primary' type='Submit'>
                            Register 
                        </Button>
                        </div>

                    </Form>
                 )}
                </Formik>
            </Col>
        </Row>
    </Container>
  )
}

export default RegProduct