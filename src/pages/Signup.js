import React, { useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/userService";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
        about:""
    });

    const [error,setError] = useState({
       errors: {},
       isError: false 
    });

    const navigate = useNavigate();

    const handleChange = (event,property) => {
        setData({...data,[property]:event.target.value});
    }
    // Resetting the form => Two way data binding at the client side
    // where if the state variable changes so field will also get changed and similarly when the field changes
    // state variable also change.
    const resetChange = ()=>{
        setData({
            name:"",
            email:"",
            password:"",
            about:""
        });
    }
    const submitForm = (event) => {
        event.preventDefault();
        // if(error.isError){
        //     toast.error("Form data is invalid. Correct all the details first then submit the form!!")
        //     setError({...error,isError:false});
        //     return;
        // }
        // console.log(data);
        // validate on client side

        // call the backend api for registering the user.
        signUp(data).then((response)=>{
            console.log(response);
            console.log("success log");
            
            toast.success("User is registered successfully with id: "+response.id+" Login Now!!");
            
            setError({
                errors:{},
                isError:false
            });
            setData({
                name:"",
                email:"",
                password:"",
                about:""
            });
            navigate("/login");
        }).catch((error)=>{
            console.log(error);
            console.log("error log");
            // handling the errors

            setError({
                errors: error,
                isError: true
            });
        });
    }
    return (
        <React.Fragment>
            <Base>
            {/* {JSON.stringify(data)} */}
            <Container className="mt-4">
                <Row>
                <Col xs="6" sm={{offset:"3"}}>
                <Card color="dark"
                inverse
                >
                    <CardBody>
                        <CardTitle className="text-center">
                            <h3>Fill Information to Register</h3>
                        </CardTitle>
                            <Form onSubmit={(e)=>{
                                submitForm(e);
                            }}>
                                {/*name field  */}
                                <FormGroup>
                                    <Label for="name">
                                        Name
                                    </Label>
                                    <Input 
                                    id = "name"
                                    name = "name"
                                    type = "text" 
                                    placeholder="Enter your name"
                                    onChange={(e)=>{
                                        handleChange(e,"name");
                                    }}
                                    value={data.name}
                                    invalid = {error.errors?.response?.data?.name?true:false}
                                    />

                                    <FormFeedback>
                                        {error.errors?.response?.data?.name}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">
                                        Email
                                    </Label>
                                    <Input 
                                    id = "email"
                                    name = "email"
                                    type = "email" 
                                    placeholder="Enter your email"
                                    onChange={(e)=>{
                                        handleChange(e,"email");
                                    }}
                                    value={data.email}
                                    invalid = {(error.errors?.response?.data?.email || error.errors?.response?.data?.message)?true:false}
                                    />

                                    <FormFeedback>
                                        {error.errors?.response?.data?.email || error.errors?.response?.data?.message}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">
                                        Password
                                    </Label>
                                    <Input 
                                    id = "password"
                                    name = "password"
                                    type = "password" 
                                    placeholder="Enter your password"
                                    onChange={(e)=>{
                                        handleChange(e,"password");
                                    }}
                                    value={data.password}
                                    invalid = {error.errors?.response?.data?.password?true:false}
                                    />

                                    <FormFeedback>
                                        {error.errors?.response?.data?.password}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="about">
                                        About
                                    </Label>
                                    <Input 
                                    id = "about"
                                    name = "about"
                                    type = "textarea" 
                                    placeholder="Enter your about"
                                    style={{
                                        height: "10rem"
                                    }}
                                    onChange={(e)=>{
                                        handleChange(e,"about");
                                    }}
                                    value={data.about}
                                    invalid = {error.errors?.response?.data?.about?true:false}
                                    />

                                    <FormFeedback>
                                        {error.errors?.response?.data?.about}
                                    </FormFeedback>
                                </FormGroup>
                                <Container className="text-center">
                                <Button type="submit" outline color="light">
                                    Register
                                </Button>
                                <Button onClick={()=>{
                                    resetChange();
                                }} className="m-2">
                                    Reset
                                </Button>
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

export default Signup;