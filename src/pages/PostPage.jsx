import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap";
import { getCurrentUser } from "../auth";
import Base from "../components/Base";
import { BASE_URL } from "../services/helper";
import { createComment, loadPostByPostId } from "../services/postService";

export const PostPage = ()=>{
    const {postId} = useParams();
    const [post,setPost] = useState(null);
    const [comment,setComment] = useState({
        content:""
    });
    const [user,setUser] = useState(undefined);

    useEffect(()=>{
        // load post from post id
        loadPostByPostId(postId).then(data=>{
            // console.log(data);
            setPost(data);
            setUser(getCurrentUser());
        })
    },[postId]);
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if(user === undefined){
            toast.error("Need to login first!!");
            return;
        }
        if(comment.content.trim() === ''){
            toast.error("Empty comment cannot be done");
            return;
        }
        createComment(postId,user.id,comment).then((data)=>{
            console.log(data);
            toast.success("Comment added succesfully");
            setPost({
                ...post,
                comments: [...post.comments,data]
            });
            setComment({
                content:""
            });
        }).catch((err)=>{
            console.log(err);
            toast.error("Some error occured!");
        })
    }
    const printDate = (numbers)=>{
        return new Date(numbers).toLocaleDateString();
    }
    return (
        <>
            <Base>
                
                <Container className="mt-4">
                   <Link to="/">Home</Link> / {(post) && <Link to="">{post.title}</Link>}
                   <Row>
                        <Col md={{
                            size: 12
                        }}>
                            <Card className="mt-3 border-0 shadow rounded-0 mb-3">
                                {
                                    (post) && (
                                        <CardBody>
                                                <CardText>Posted by <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b></CardText>
                                                <CardText>
                                                    <span className="text-muted">{post.category.categoryTitle}</span>
                                                </CardText>
                                                <div className="divider"
                                                style={{width:"100%",height:"1px",background:"#e2e2e2"}}>
                                                </div>
                                                <h1 className="mt-3">{post.title}</h1>
                                                <div className="image-container ps-2 mt-3" style={{maxWidth: "50%"}}>
                                                    <img className="img-fluid shadow"src={BASE_URL+`/post/image/${post.imageName}`} alt={post.imageName} style={{maxHeight:"30rem"}}/>
                                                </div>
                                                <CardText className="ps-2 mt-3" dangerouslySetInnerHTML={{__html:post.content}}></CardText>
                                        </CardBody>
                                    )
                                }

                            </Card>
                        </Col>
                   </Row>
                   
                   <Row className="my-4">        
                        <Col md={{
                            size: 9,
                            offset:1
                        }}>
                            <h3>Comments ( {post?post.comments.length:0} ) </h3>

                            {
                                post && post.comments.map((c,index)=>(
                                    <Card className="mt-4 border-0" key={index}>
                                        <CardBody>
                                            <CardText>{c.content}</CardText>
                                        </CardBody>
                                    </Card>
                                ))
                            }
                            <form onSubmit={handleSubmit}>
                            <Card className="mt-4 border-0">
                                <CardBody>
                                    <Input type="textarea" placeholder="Enter comment here"
                                        onChange={(event)=>setComment({content:event.target.value})}
                                        value={comment.content}
                                    />
                                    <Button type="submit" className="mt-2">Submit</Button>
                                </CardBody>
                            </Card>
                            </form>
                        </Col>
                   </Row>
                </Container>
            </Base>
        </>
    );
}