import React, {  useState } from 'react'
import { Button,  Col, Container, Modal, Row } from 'react-bootstrap'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Products.css'
import axios from 'axios'
import { Bounce, toast } from 'react-toastify'


const Products = () => {
    
    const {products} = useSelector((state)=> state?.prod    ??  [])
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const [prod,setProd] = useState({
        id:'',
        name:""
    })

    const handleClose = () => setShow(false);
    const handleShow = (id,name) => {
        setShow(true)
        setProd({
            id:id,
            name:name
        })
    };

    const fp = 'http://localhost:4444/'

    const handleDelete = async () => {
       
        try {
          
            const res = await axios.delete(`${fp}product/${prod.id}`,{withCredentials:true})

            if(res.data.success){
                toast.success('Product Deleted Successfully', {
                    position: "top-right",
                    autoClose: 1000,
                    theme: "light",
                    transition: Bounce,
                })
                handleClose()
            }else{
                toast.error(res.data.message, {
                    position: "top-right",
                    autoClose: 1000,
                    theme: "light",
                    transition: Bounce,
                })
                handleClose()
            }

        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 1000,
                theme: "light",
                transition: Bounce,
            })
            handleClose()
        }
    }
   
    


  return (
    <Container>
        <Row className=' justify-content-center d-flex'>
           <Col md={2}>
           <h2>Products</h2>
           </Col>

        </Row>
    
        <Row>
            <Col>
                sl no
            </Col>

            <Col>
                name
            </Col>

            <Col>
                category
            </Col>
            <Col>
                description
            </Col>
            <Col>
                price
            </Col>
            <Col>
                Images
            </Col>
            <Col>
                
            </Col>
        </Row>
        {products.map((e,index)=>(
                <Row key={e._id}>
                    <Col>
                        {index+1}
                    </Col>
                    <Col>
                        {e.name}
                    </Col>
                    <Col>
                        {e.category}
                    </Col>
                    <Col>
                        {e.description}
                    </Col>
                    <Col>
                        {e.price}
                    </Col>
                    <Col className='d-flex '>
                        {e.image.map((img,imgIndex)=>(
                            <div className='imgField 'key={imgIndex}>
                                <img src={`${fp}${img}`} className='w-100' alt={`${e.name}`} />
                            </div>
                        ))}
                    </Col>
                    <Col>
                        <div className='d-flex gap-2'>
                            <Button className='w-50 ' variant='success' onClick={()=>navigate(`/editProduct/${e._id}`)}>Edit</Button>
                            <Button className='w-50' variant='danger' onClick={()=>handleShow(e._id,e.name)}>Delete</Button>
                        </div>
                    </Col>
                </Row>
            ))}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{prod.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You Sure to Delete This Product?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
    </Container>
)
}

export default Products