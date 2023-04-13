import React from "react";
import { Button } from "reactstrap";
import Base from "../components/Base";
import userContext from "../context/userContext";
const About = () =>{
    return (
        <React.Fragment>
            <userContext.Consumer>
                {(object)=>(
                    <Base>
                    <h1>This is about component</h1>
                    <Button color="primary">Click Here</Button>
                    <h1>Name is: {object.user.data.name}</h1>
                    </Base>
                )}
            </userContext.Consumer>
        </React.Fragment>
    );
}
export default About;