import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import './Register.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Bounce, Slide, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { upProfile } from '../redux/authSlice';

const UpdateProfile = () => {

    const {user} = useSelector((state)=> state?.auth ?? [])
    const {pid} = useParams()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { Formik } =  formik
    const schema = yup.object().shape({
        name:yup.string().required("please enter a name"),
        email:yup.string().email("please Enter a valid email").required(),
        pfp:yup.mixed().required("Please provide a profile a pictue")
    })


    const formData = new FormData()


    const handleForm = async (RegData)=>{
      const {name,email,pfp} = RegData
       try {

                formData.append('name',name)
                formData.append('email',email)
                formData.append('pfp',pfp)
                
                // console.log(formData)
                const res = await axios.put(`http://localhost:4444/profile/${pid.toString()}`,formData,
                  {
                    withCredentials:true
                  })


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

              }
            )
                navigate('/profile') 
                dispatch(upProfile({user:res.data.user}))
            }else{
              toast.error(res.data.message,{
                position:"top-right",
                autoClose: 2000,
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
          toast.error(error.message,{
            position:"top-right",
            autoClose: 2000,
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

    const handleFormChange = (e,setFieldValue)=>{
      const file = e.target.files[0]
      setFieldValue('pfp',file)
    }


return (
    <Container fluid className="registration-container">
    <Row className='justify-content-center'>
      <Col md={4} className='mx-auto my-3 justify-content-center'>
        <h3>Update Profile</h3>
      </Col>
    </Row>
    
    <Row>
      <Col xs={8} sm={6} md={6} lg={4} className='mx-auto my-3'>
        <Formik
          validationSchema={schema}
          onSubmit={handleForm}
          initialValues={{
            name: user.name,
            email: user.email,
            pfp:null,
          }}
        >
          {({ setFieldValue,handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit} method='post' encType='multipart/form-data'>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                  autoComplete='fullname'
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={values.email}
                  name="email"
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                  autoComplete='email'
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
  
              
              <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  name="pfp"
                  onChange={(e)=>{handleFormChange(e,setFieldValue)}}
                  isValid={touched.pfp && !errors.pfp}
                  isInvalid={!!errors.pfp}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.pfp}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit">Update</Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  </Container>
)

}

export default UpdateProfile