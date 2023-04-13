import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUser } from "../auth";
import userContext from "../context/userContext";

export const Post = ({post={ postId:-1, title:"default title",content:"default content"},deletePost})=>{
    const [user,setUser] = useState()
    const userContextData = useContext(userContext);

    useEffect(()=>{
        setUser(getCurrentUser);
    },[]);

    return (
        <>
            <Card className="border-0 shadow mt-3">
                <CardBody>
                    <h1>{post.title}</h1>
                    <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,1000)+"...."}}>
                    </CardText>
                    <div>
                        <Link className="btn btn-secondary" to={"/posts/" + post.postId}>Read More</Link>

                        {userContextData.user.loggedIn && user && user.id === post.user?.id && <Button color="danger" className="ms-2" onClick={()=>deletePost(post)}>Delete</Button>}
                        {userContextData.user.loggedIn && user && user.id === post.user?.id && <Button tag={Link} to={`/user/update-blog/${post.postId}`} color="warning" className="ms-2" >Update</Button>}
                    </div>
                </CardBody>
            </Card>
        </>       
    );
}