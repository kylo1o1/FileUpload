import React, { useEffect, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import * as formik from 'formik'
import * as yup from 'yup'
import './RegProduct.css'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editProduct } from '../redux/productSlice'

const UpdateProduct = () => {

    const sv = 'http://localhost:4444/'
    const [imageField, setImageField]  = useState([])
    const [exImages, setExImages] = useState([])

    const navigate = useNavigate()    
    const dispatch = useDispatch()

    const { id } = useParams()
    const { products } = useSelector((state) => state?.prod ?? [])

    const prod = products.find((e) => e._id === id)


    
    useEffect(() => {
        if (prod?.image) {
            setExImages(prod.image) 
        }
    }, [prod])

    const { Formik } = formik
    const schema = yup.object().shape({
        name: yup.string().required("Please enter Products name"),
        category: yup.string().required("Please enter product category"),
        description: yup.string().required(),
        price: yup.string().required(),
    })

    const addFields = () => {
        setImageField((prev) => [...prev, []])
    }

    const handleFileChange = (e, index) => {
        const file = Array.from(e.target.files)
        const prevs = [...imageField]
        prevs[index] = file
        setImageField(prevs)
    }

    const handleRemoveImage = (index) => {
        const updatedProducts = [...imageField]
        updatedProducts.splice(index, 1)
        setImageField(updatedProducts)
    }
    
    const removeEx = (i)=>{
            const prev = [...exImages]
            prev.splice(i,1)
            setExImages(prev)
    }

    const handleProductEdit = async (data) => {
        const { name, category, description, price } = data
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('category', category)
            formData.append('description', description)
            formData.append('price', price)

            exImages.forEach((img)=>{
                formData.append('files',img)
            })

            imageField.forEach((file) => {
                if (file && file[0]) {
                    formData.append('files', file[0])
                }
            })
            const res = await axios.put(`http://localhost:4444/product/${id}`, formData , {withCredentials:true})
            console.log(res.message)
            if (res.data.success) {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    theme: "light",
                    transition: Bounce,
                })

                navigate('/products')
                dispatch(editProduct({newProduct:res.data.newProduct}))
            } else {
                toast.error(res.data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    theme: "light",
                    transition: Bounce,
                })
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Bounce,
            })
        }
    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={2}>
                    <h2>Edit Product</h2>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col md={7}>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleProductEdit}
                        initialValues={{
                            name: prod.name ,
                            category: prod.category  ,
                            description: prod?.description || '',
                            price: prod?.price || '',
                            img: null
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form noValidate encType='multipart/form-data' method='post' onSubmit={handleSubmit}>
                                <Form.Group className='mb-3'>
                                    <FloatingLabel controlId='floatingName' label='Product Name'>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Your Product name"
                                            name="name"
                                            onChange={handleChange}
                                            value={values.name}
                                            isValid={touched.name && !errors.name}
                                            isInvalid={!!errors.name}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <FloatingLabel controlId='floatingCat' label='Product Category'>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Your Product category"
                                            name="category"
                                            onChange={handleChange}
                                            value={values.category}
                                            isValid={touched.category && !errors.category}
                                            isInvalid={!!errors.category}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <FloatingLabel controlId='floatingDesc' label='Product Description'>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Your Product description"
                                            name="description"
                                            onChange={handleChange}
                                            value={values.description}
                                            isValid={touched.description && !errors.description}
                                            isInvalid={!!errors.description}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className='mb-3'>
                                    <FloatingLabel controlId='floatingPrice' label='Product Price'>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Your Product price"
                                            name="price"
                                            onChange={handleChange}
                                            value={values.price}
                                            isValid={touched.price && !errors.price}
                                            isInvalid={!!errors.price}
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                                </Form.Group>



                                {exImages.map((img, index) => (
                                <div key={`existing-image-${index}`} className="mb-3 thumbnail">
                                    <img src={`${sv}${img}`} alt={`Product  ${index + 1}`} className="img-thumbnail" />
                                    <Button variant='danger' type='button' onClick={()=>removeEx(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                    </svg>
                                    </Button>
                                </div>
                                ))}
                                {imageField.map((file, index) => (
                                    <Form.Group className='mb-3 d-flex' key={`file-input-${index}`}>
                                        <FloatingLabel controlId={`floatingImg-${index}`} label={`Product Image ${index + 1}`} className='w-100'>
                                            <Form.Control
                                                type="file"
                                                name='img'
                                                onChange={(e) => handleFileChange(e, index)}
                                            />
                                        </FloatingLabel>
                                        <Button variant="outline-danger" id="button-addon2" onClick={() => handleRemoveImage(index)}>Remove</Button>
                                    </Form.Group>
                                ))}
                                <Col className='mb-3'>
                                    <Button variant='success' className='w-100' onClick={addFields} type='button'>Add Image</Button>
                                </Col>
                                <div className='d-flex justify-content-between'>
                                    <Button variant='primary' type='Submit' className='w-50'>Update</Button>
                                    <Button variant='danger' className='w-50' onClick={()=> navigate('/products')}>Cancel</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    )
}

export default UpdateProduct