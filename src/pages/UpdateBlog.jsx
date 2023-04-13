import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../components/Base";
import userContext from "../context/userContext";
import { loadPostByPostId, updatePostService } from "../services/postService";
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Input, Label } from "reactstrap";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import { loadAllCategories } from "../services/categoryService";

export const UpdateBlog = ()=>{
    const {postId} = useParams();
    const object = useContext(userContext);
    const [post,setPost] = useState(null);
    const navigate = useNavigate();
    const editor = useRef(null);
    const [categories,setCategories] = useState([]);
    
    useEffect(()=>{
        
        loadAllCategories().then((data)=>{
            // console.log(data);
            setCategories(data);
        }).catch((error)=>{
            console.log(error);
        });
        loadPostByPostId(postId).then((data)=>{
            setPost({...data,categoryId:data.category.categoryId});
        }).catch((err)=>{
            console.log(err);
        })
    },[]);

    useEffect(()=>{
        if(post){
        if(post.user.id !== object.user.data.id){
            toast.error("This is not your post!")
            navigate('/');
        }
        }
    },[post])
    
    const handleChange = (event,fieldName)=>{
        setPost({
            ...post,
            [fieldName]: event.target.value
        });
    }
    const updatePost = (event)=>{
        event.preventDefault();
        
        updatePostService(post.postId,{...post,category:{categoryId:post.categoryId}}).then((data)=>{
            toast.success("Post updated successfully!");
        }).catch((err)=>{
            toast.error("Error in Updating the post!");
        })
    }
    function updateHtml(){
        return (
            <div className="wrapper mt-4">
            <Card className="px-2 shadow border-0">
                <CardTitle className="text-center"><h1>Update Post</h1></CardTitle>
                <CardBody>
                    <Form onSubmit={updatePost}>
                        <FormGroup>
                            <Label for="title">Post Title</Label>
                            <Input 
                            id = "title"
                            name = "title"
                            type = "text"
                            placeholder="Enter the title here"
                            value={post.title}
                            onChange = {(event)=>{handleChange(event,'title')}}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Post Content</Label>
                            <JoditEditor 
                            ref = {editor}
                            value={post.content}
                            onChange = {newContent=>{
                                setPost({...post,content:newContent})
                            }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Post Image</Label>
                            <Input id="image" type="file"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="categoryId">Post Category</Label>
                            <Input 
                            id = "categoryId"
                            name = "categoryId"
                            type = "select"
                            onChange={(event)=>{handleChange(event,'categoryId')}}
                            value={post.categoryId}
                            >
                                <option disabled value={0}>--Select Category--</option>
                                {
                                    categories.map((category)=>{
                                        return <option value = {category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    })
                                }
                            </Input>
                        </FormGroup>
                        <Container className="text-center">
                            <Button type="submit" color="primary" className="rounded-0">Update Post</Button>
                            <Button className="ms-2 rounded-0" color="danger">Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
        );
    }
    return (
        <Base>
            <Container>
                {post && updateHtml()}
            </Container>
        </Base>
    );
}