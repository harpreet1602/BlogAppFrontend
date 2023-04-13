import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col,Row } from "reactstrap";
import Base from "../../components/Base";
import { ViewUserProfile } from "../../components/ViewUserProfile";
import { getUser } from "../../services/userService";

export const ProfileInfo = ()=>{
    // let userContextData = useContext(userContext);
    let {userId} = useParams();
    const [userDetails,setUserDetails] = useState({});

    useEffect(()=>{
        getUser(userId).then((data)=>{
            setUserDetails({...data});
            console.log(data)
        }).catch((err)=>{
            console.log(err);
        })
    },[]);

    const userView = ()=>{
        return(
            // <Container>
            <Row>
            <Col md={{size:"6",offset:"3"}}>
                <ViewUserProfile userDetails={userDetails}/>
            </Col>
            </Row>
        // </Container>
        )
    }
    return (
    <Base>
        {/* <h1>Profile Info</h1>
        <h3>Name is: {userContextData.user.data.name}</h3> */}
        {userDetails? userView():"User Details are loading...."}
    </Base>
    );
}