import { Link } from "react-router-dom";
import { Card, CardBody, CardText } from "reactstrap";

export const Post = ({post={title:"default title",content:"default content"}})=>{
    return (
        <>
            <Card className="border-0 shadow mt-3">
                <CardBody>
                    <h1>{post.title}</h1>
                    <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,1000)+"...."}}>
                    </CardText>
                    <div>
                        <Link className="btn btn-secondary" to={"/posts/" + post.postId}>Read More</Link>
                    </div>
                </CardBody>
            </Card>
        </>       
    );
}