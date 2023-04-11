import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUser } from "../auth";

export const Post = ({post={ postId:-1, title:"default title",content:"default content"},deletePost})=>{
    const [user,setUser] = useState()
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

                        {user && user.id === post.user?.id && <Button color="danger" className="ms-2" onClick={()=>deletePost(post)}>Delete</Button>}
                    </div>
                </CardBody>
            </Card>
        </>       
    );
}