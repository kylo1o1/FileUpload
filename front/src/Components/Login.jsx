import React, { useState } from 'react'
import './Login.css'

import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import OtpVer from './OtpVer';


const Login = () => {

   

   const [send,setSend] = useState(false)
  const [email,setEmail ] = useState('')
    const navigate = useNavigate()
    const {Formik} = formik
    const schema = yup.object().shape({
      email:yup.string().email().required('please enter your email'),
      password:yup.string().required('please Enter your Password')
    })

    const handleLogin = async (val) => {
      try {
        const res = await axios.post('http://localhost:4444/sendOtp',{
          email:val.email,
          password:val.password,
        },{
          withCredentials:true
        })
        if(res.data.success){
            setSend(true)
            setEmail(val.email)
            toast.success('An OTP has been sent to your email',{
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
        toast.error(error.message,{
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
        <Row>
            <Col md={4} className='mx-auto my-2 log-heading' >
                <h3>Login </h3>
            </Col>
        </Row>
        <Row>
         
            <Col md={4} className='mx-auto my-3 '>
            <Formik
              validationSchema={schema}
              onSubmit={handleLogin}
              initialValues={{
                email: '',
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                 
      
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      name="email"
                      value={values.email}
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
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="*************"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password}
                      autoComplete='email'
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                
      
                  <Button type="submit" className={`${send ? 'd-none' : ''}`}>Send OTP</Button>
                </Form>
              )}
            </Formik>
            </Col>
            
        </Row>
          {send && (
            <OtpVer email={email}/>
          )}
        <Row>
          <Col md={4} className='mx-auto'>
              <span onClick={()=> navigate('/register')}>register </span>
          </Col>
        </Row>

    </Container>
)
}

export default Login