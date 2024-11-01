import React from 'react'
import { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { updateStudentApi } from '../services/allApis';
import { editResponseContext } from '../contextApi/Context';

function Edit({student}) {
    const [show, setShow] = useState(false);
    const [detail,setDetail]=useState({...student})
    const [preview,setPreview]=useState("")

    const {setEditResponse}=useContext(editResponseContext)

    useEffect(()=>{
        if(detail.image.type){
            setPreview(URL.createObjectURL(detail.image))
        }
        else{
            setPreview("")
        }
    },[detail.image])

    const handleEdit=async()=>{
        console.log(detail)
        const {name,phone,batch,image}=detail
        if(!name || !phone || !batch || !image){
            toast.warning("Invalid input!!")
        }
        else{
            if(image.type){
                const fd=new FormData()
                fd.append('name',name)
                fd.append('phone',phone)
                fd.append('batch',batch)
                fd.append('image',image)

                const header={
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }

                const res=await updateStudentApi(student._id,fd,header)
                if(res.status==200){
                    toast.success("Student Details Updated!!")
                    setEditResponse(res)
                    handleClose()
                    setDetail({...res.data})
                    setPreview("")

                }
                else{
                    toast.error("Updation Failed!!")
                    console.log(res)
                }
            }
            else{
                const header={
                    'Content-Type':'application/json',
                    'Authorization':`Token ${sessionStorage.getItem('token')}`
                }
                const res=await updateStudentApi(student._id,detail,header)
                if(res.status==200){
                    toast.success("Student Details Updated!!")
                    setEditResponse(res)
                    handleClose()
                    setDetail({...res.data})
                    setPreview("")

                }
                else{
                    toast.error("Updation Failed!!")
                    console.log(res)
                }
            }
        }
    }

    const handleClose = () => {
        setShow(false)
    };
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='btn' onClick={handleShow}>
                <i className="fa-regular fa-pen-to-square" style={{ color: "#63E6BE", }} />
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal-xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <label>
                                <input type="file" style={{ visibility: 'hidden' }} onChange={(e)=>setDetail({...detail,image:e.target.files[0]})}/>
                                <img src={preview?preview:`${base_url}/uploads/${student.image}`}
                                    className='img-fluid' alt="" />
                            </label>
                        </Col>
                        <Col sm={6} className='d-flex flex-column justify-content-center'>
                            <input type="text" defaultValue={student?.name} placeholder='Enter Name' onChange={(e)=>setDetail({...detail,name:e.target.value})} name='name' className="form-control mb-2" />
                            <input type="number" defaultValue={student?.phone} placeholder='Enter phone number' onChange={(e)=>setDetail({...detail,phone:e.target.value})} name='phone' className="form-control mb-2" />
                            <input type="text" defaultValue={student?.batch} placeholder='Enter Class' onChange={(e)=>setDetail({...detail,batch:e.target.value})} name='class' className="form-control mb-2" />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit