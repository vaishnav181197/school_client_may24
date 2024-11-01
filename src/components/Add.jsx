import React from 'react'
import { useState, useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addStudentApi } from '../services/allApis';
import { addResponseContext } from '../contextApi/Context';

function Add() {
    const [show, setShow] = useState(false);
    const [student, setStudent] = useState({
        name: "", phone: "", batch: "", image: ""
    })
    const [preview, setPreview] = useState("")

    const {addResponse,setAddResponse}=useContext(addResponseContext)


    useEffect(() => {
        if (student.image) {
            setPreview(URL.createObjectURL(student.image))
        }
        else {
            setPreview("")
        }
    },
        [student.image])

    const handleAddStudent = async () => {
        console.log(student)
        const {name,batch,phone,image}=student
        if(!name || !batch || !phone || !image){
            toast.warning("Enter Valid Input!!")
        }
        else{
            const fd=new FormData()
            fd.append("name",name)
            fd.append("batch",batch)
            fd.append("phone",phone)
            fd.append("image",image)

            const header={
                "Content-Type":"multipart/form-data",
                "Authorization":`Token ${sessionStorage.getItem('token')}`
            }
            const res=await addStudentApi(fd,header)
            if(res.status==200){
                toast.success("Student Added!!")
                handleClose()
                setAddResponse(res)
            }
            else{
                console.log(res)
                toast.error("Adding Student Failed!!")
            }

        }
    }

    const handleClose = () => {
        setShow(false);
        setStudent({
             name: "", phone: "", batch: "", image: ""
        })
    }
    const handleShow = () =>setShow(true);
    return (
        <>
            <button className='btn btn-success' onClick={handleShow}>Add Student +</button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal-xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <div>
                                <label>
                                    <input type="file" onChange={(e) => setStudent({ ...student, image: e.target.files[0] })} style={{ visibility: 'hidden' }} />
                                    <img src={preview ? preview : "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"}
                                        className='img-fluid' alt="" />
                                </label>
                            </div>
                        </Col>
                        <Col sm={6} className='d-flex flex-column justify-content-center'>
                            <input type="text" onChange={(e) => setStudent({ ...student, name: e.target.value })} placeholder='Enter Name' name='name' className="form-control mb-2" />
                            <input type="number" onChange={(e) => setStudent({ ...student, phone: e.target.value })} placeholder='Enter phone number' name='phone' className="form-control mb-2" />
                            <input type="text" onChange={(e) => setStudent({ ...student, batch: e.target.value })} placeholder='Enter Class' name='class' className="form-control mb-2" />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddStudent}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add