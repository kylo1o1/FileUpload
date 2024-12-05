import React, { useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import './Profile.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'


const Profile = () => {
  

  const {user} = useSelector((state)=> state?.auth  ??  [])
  const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:4444/profile/${user?.id}`,{withCredentials:true})

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
            navigate('/') 
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

              }
            )
           
      }

    } catch (error) {
      toast.error(error.message,
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
        
    }
  }


  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={4}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://static-cse.canva.com/blob/1167931/beautifultwitterbanners.jpg" alt='banner' />
          <div className='pfp-outer'>
              <Card.Img src={`http://localhost:4444/${user.pfp}`} alt="pfp" className='pfp' />
          </div>
          <Card.Body className='mt-5'>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <div className='d-flex justify-content-around'>
            <Button variant="primary" onClick={()=>navigate(`/profile/${user.id}`)}>Update Profile</Button>
            <Button variant='danger' onClick={handleShow}>
              Delete Profile
            </Button>
            </div>
          </Card.Body>
        </Card>
        </Col>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              are you sure?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                no
              </Button>
              <Button variant="danger" onClick={handleDelete}>Yes</Button>
            </Modal.Footer>
          </Modal>
      </Row>
    </Container>
  )
}

export default Profile