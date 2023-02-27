import React from "react";
import { Button } from "reactstrap";
import Base from "../components/Base";
const About = () =>{
    return (
        <React.Fragment>
            <Base>
                <h1>This is about component</h1>
                <Button color="primary">Click Here</Button>
            </Base>
        </React.Fragment>
    );
}
export default About;