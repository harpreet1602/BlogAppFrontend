import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { doLogIn, getCurrentUser } from "../auth";
import Base from "../components/Base";
import userContext from "../context/userContext";
import { login } from "../services/userService";

const Login = () =>{
    const [loginDetails,setLoginDetails] = useState({
        username:"",
        password:""
    });
    
    const navigate = useNavigate();

    const handleChange = (event,field) => {
        setLoginDetails({...loginDetails,[field]:event.target.value});
    }

    const submitLogin = (event)=>{
        event.preventDefault();
        console.log(loginDetails);

        // validating on client side  
        if(loginDetails.username.trim() === "" || loginDetails.password.trim() === ""){
            toast.error("Username and Password is required!")
            return;
        }

        // call the backend api with the data
        login(loginDetails).then((response)=>{
            console.log("Success log");
            console.log(response);
            doLogIn(response,()=>{
                console.log("Response is saved in localstorage");
            });
            toast.success("User Logged in Successfully!!");
            setLoginDetails({
                username:"",
                password:""
            });
            // redirect to user dashboard after logging in
            
            navigate("/user/dashboard");
        }).catch((error)=>{
            console.log("Error log");
            console.log(error);
            if(error.response.status === 400 || error.response.status === 404){
                toast.error(error.response.data.message);
            }
            else{
                toast.error("Invalid server error");
            }
        });
    }

    const resetChange = () => {
        setLoginDetails({
            username:"",
            password:""
        });
    }
    return (
        <React.Fragment>
            <Base>
            <Container className="mt-4">
                <Row>
                    <Col
                    sm = {{
                        size:6,
                        offset:3
                    }}
                    >
                        <Card color="dark" inverse>
                            <CardHeader className="text-center">
                                <h3>Login Here</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={(e)=>{
                                    submitLogin(e);
                                }}>
                                    <FormGroup>
                                        <Label>
                                            Email
                                        </Label>
                                        <Input
                                        type = "email"
                                        name = "email"
                                        id = "email"
                                        value = {loginDetails.username}
                                        onChange = {(e)=>{
                                            handleChange(e,"username");
                                        }}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>
                                            Password
                                        </Label>
                                        <Input
                                        type = "password"
                                        name = "password"
                                        id = "password"
                                        value = {loginDetails.password}
                                        onChange = {(e)=>{
                                            handleChange(e,"password");
                                        }}
                                        />
                                    </FormGroup>
                                    <Container className="text-center">
                                        <Button type="submit" color="light" outline>Login</Button>
                                        <Button className="ms-2" color="secondary" onClick={()=>{
                                            resetChange();
                                        }}>Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </Base>
        </React.Fragment>
    );
}

export default Login;