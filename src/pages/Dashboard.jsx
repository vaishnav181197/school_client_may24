import React, { useEffect, useState,useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Add from '../components/Add';
import Edit from '../components/Edit';
import { getStudentsApi,deleteStudentApi } from '../services/allApis';
import { addResponseContext,editResponseContext } from '../contextApi/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const [students, setStudents] = useState([])
    const [searchKey,setSearchKey]=useState("")
    console.log(searchKey)
    const nav=useNavigate()

    const {addResponse,setAddResponse}=useContext(addResponseContext)
    const {editResponse}=useContext(editResponseContext)

    useEffect(() => {
        getData()
    }, [addResponse,editResponse,searchKey])


    const getData = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getStudentsApi(header,searchKey)
        console.log(res)
        if (res.status == 200) {
            setStudents(res.data)
        }
    }

    const deleteStudent=async(id)=>{
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res=await deleteStudentApi(id,header)
        if(res.status==200){
            toast.success("Student Details Removed!!")
            getData()
        }
        else{
            toast.error("Something Went Wrong")
            console.log(res)
        }
    }

    const logout=()=>{
        sessionStorage.clear()
        nav('/auth')
    }

    return (
        <>
            <Navbar className="bg-info">
                <Container>
                    <Navbar.Brand href="#home">
                        <i className="fa-solid fa-school fa-xl" style={{ color: "#63E6BE", }} />
                        {' '}
                        Student Management
                    </Navbar.Brand>
                    <button className='btn btn-danger' onClick={logout}>Logout</button>
                </Container>
            </Navbar>

            <div className='p-3'>
                <div className='d-flex justify-content-between'>
                <Add />
                <div>
                    <input type="text" placeholder='Enter Name to Search' onChange={(e)=>setSearchKey(e.target.value)} className="form-control" />
                </div>
                </div>

                {
                    students.length > 0 ?
                        <table className="table table-bordered mt-4">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Phone</th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students?.map((item,index) => (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.batch}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                <Edit student={item}/>
                                                <button className='btn' onClick={()=>deleteStudent(item._id)}>
                                                    <i className="fa-solid fa-trash" style={{ color: "#f9103f", }} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                        :
                        <h3 className='text-center text-danger'>No Students Added Yet!!</h3>
                }



            </div>
        </>
    )
}

export default Dashboard