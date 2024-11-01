import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
        <div className='w-100 d-flex justify-content-center align-items-center' style={{height:'100vh',backgroundColor:'lightblue'}}>
            <div className='w-75 p-5'>
                <Row>
                    <Col >
                        <h2>Student Management</h2>
                        <p style={{textAlign:'justify'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aperiam earum, consequuntur nemo perspiciatis esse deserunt quos eos facere! 
                            Incidunt iste exercitationem fuga vitae ipsam possimus commodi ratione temporibus. Omnis? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore quibusdam unde incidunt cum. Quam laudantium laboriosam dolorem molestias illum? Soluta nobis non nulla explicabo adipisci rerum ad, mollitia fugiat impedit.</p>
                        <Link to={'/auth'} className='btn btn-success'>Let's Go</Link>
                    </Col>
                    <Col >
                        <img src="https://img.freepik.com/free-vector/students-wearing-face-masks_23-2148587956.jpg"
                         alt="" className='img-fluid w-100' />
                    </Col>
                </Row>
            </div>  
        </div>
    </>
  )
}

export default Landing