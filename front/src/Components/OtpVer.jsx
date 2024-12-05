import React, { useState } from 'react'
import './Login.css'

import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const OtpVer = ({email}) => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const {Formik} = formik
    const schema = yup.object().shape({
      otp:yup.string().required('please enter your otp')
    })

    const verOtp = async (val) => {
        try {

          const res = await axios.post('http://localhost:4444/verOtp',{
            otp:val.otp,  
            email
          },{withCredentials:true})

          if(res.data.success){
            toast.success('Otp Verified',{
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
              dispatch(login({ user:res.data.user,
                isAuth:res.data.isAuth,}))
              navigate('/profile')
        }else{
            toast.error('Otp Verification Failed',{
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
        
            // toast.success('An OTP has been sent to your email',{
            //   position:"top-right",
            //         autoClose: 1000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "light",
            //         transition: Bounce,
            // })
            // navigate('/otpVerify')
    

     
   
      }
    
     return (
   
            <Row>      
            <Col md={4} className='mx-auto my-3 '>
            <Formik
              validationSchema={schema}
              onSubmit={verOtp}
              initialValues={{
                otp: '',
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                 
      
                  <Form.Group className="mb-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      type="text"
                      name="otp"
                      value={values.otp}
                      onChange={handleChange}
                      isValid={touched.otp && !errors.otp}
                      isInvalid={!!errors.otp}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {errors.otp}
                    </Form.Control.Feedback>
                  </Form.Group>
      
                
      
                  <Button type="submit">Verify OTP</Button>
                </Form>
              )}
            </Formik>
            </Col>
            </Row>
            
       
     )
}

export default OtpVer