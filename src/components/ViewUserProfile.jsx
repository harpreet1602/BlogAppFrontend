import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, Col, Container, Row, Table } from "reactstrap";
import { getCurrentUser } from "../auth";

export const ViewUserProfile = ({userDetails})=>{
    const [user,setUser] = useState(null);

    useEffect(()=>{
        setUser(getCurrentUser());
    },[]);

    return (
        <Card className="mt-3 border-0 rounded-0 shadow-sm">
                <CardBody>
                    <div className="text-center">
                        <CardTitle className="text-center"><h1>Profile Info</h1></CardTitle>
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
                                <td>{userDetails.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{userDetails.email}</td>
                            </tr>
                            <tr>
                                <td>About</td>
                                <td>{userDetails.about}</td>
                            </tr>
                            <tr>
                                <td>Roles</td>
                                <td>{userDetails.roles?.map((role,index)=>{
                                    return <div key={index}>{role.name}</div>
                                })}</td>
                            </tr>
                            </tbody>
                    </Table>
                    {user? (user.id === userDetails.id)? <Button tag={Link} to={`/user/updateprofileinfo/${userDetails.id}`} color="warning">Update Profile</Button>:"":""}
                    </div>
                </CardBody>
            </Card>
    );
}