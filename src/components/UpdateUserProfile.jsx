import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardTitle, Col, Container, Input, Row, Table } from "reactstrap";
import { getCurrentUser } from "../auth";
import { getUser, updateUser } from "../services/userService";
import Base from "./Base";

export const UpdateUserProfile = ()=>{
    const [user,setUser] = useState(null);
    let {userId} = useParams();
    const [userDetails,setUserDetails] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        setUser(getCurrentUser());
        getUser(userId).then((data)=>{
            setUserDetails({...data});
            console.log(data)
        }).catch((err)=>{
            console.log(err);
        })
        // if(user && user.id !== userDetails.id){
        //     navigate("/");
        // }
    },[]);

    function handleChange(e,fieldName){
        setUserDetails({
            ...userDetails,
            [fieldName]:e.target.value
        });
    }
    function handleUpdate(){
        updateUser(userId,userDetails).then((data)=>{
            console.log(data);
            toast.success("User Profile Updated Successfully!");
            navigate(`/user/profileinfo/${userDetails.id}`)
        }).catch((err)=>{
            console.log("Error in updating user profile");
        })
    }
    return (
        <Base>
        {userDetails && user && user.id === userDetails.id?
        <Row>
        <Col md={{size:"6",offset:"3"}}>
        <Card className="mt-3 border-0 rounded-0 shadow-sm">
                <CardBody>
                    <div className="text-center">
                        <CardTitle className="text-center"><h1>Update Profile Info</h1></CardTitle>
                        <img src={userDetails.image?userDetails.image:"https://cdn.onlinewebfonts.com/svg/img_569204.png"} style={{maxWidth:"150px"}} className="img-fluid"/>
                    <Table
                        hover
                        responsive
                        striped
                        // bordered
                        className="mt-4 text-center"
                        >
                            <tbody>
                            <tr>
                                <td width={"50%"}>Name</td>
                                <td>
                                    <Input type="text" 
                                    value={userDetails.name}
                                    onChange={(e)=>{handleChange(e,'name')}}
                                    />    
                                </td>
                            </tr>
                            <tr>
                                <td>About</td>
                                <td>
                                    <Input type="text" 
                                    value={userDetails.about}
                                    onChange={(e)=>{handleChange(e,'about')}}
                                    />
                                </td>
                            </tr>
                            </tbody>
                    </Table>
                    <Button onClick={handleUpdate} color="warning">Update</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
        </Row>
        :
        <div className="text-center mt-3">
            <h1>Not Authorized</h1>
        </div>
        }
        </Base>
    );
}