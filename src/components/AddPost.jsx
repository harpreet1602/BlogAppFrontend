import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/categoryService";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { createPost as doCreatePost, uploadPostImage } from "../services/postService";
import { getCurrentUser } from "../auth";

const AddPost = ({posts,setPosts})=>{
    const [categories,setCategories] = useState([]);
    const [user,setUser] = useState(undefined);
    const editor = useRef(null);
    // const [content,setContent] = useState("");
    const [post,setPost] = useState({
       title:"",
       content:"",
       categoryId:-1
    });
    
    const [image,setImage] = useState(null);

    useEffect(()=>{
        loadAllCategories().then((data)=>{
            // console.log(data);
            setCategories(data);
            setUser(getCurrentUser());
        }).catch((error)=>{
            console.log(error);
        });
    },[]);

    const fieldChange = (event) => {
        // console.log(event);
        setPost({...post,[event.target.name]:event.target.value});
    }
    const contentChange = (text) => {
        setPost({...post,"content":text});
    }

    const handleImage = (event) =>{
        // console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    const createPost = (event) => {
        event.preventDefault();

        // console.log(post);

// Client side validation before sending the request to backend.
        if(post.title.trim() === ""){
            toast.error("Post title is required!");
            return;
        }
        if(post.content.trim() === ""){
            toast.error("Post content is required!");
            return;
        }
        
        if(post.categoryId === -1){
            toast.error("Please select the post category!");
            return;
        }
        if(image && !image.type.startsWith("image")){
            toast.error("Please select Image format only!");
            return;
        }
        // Submit the form to create the post after validation.
        post['userId'] = user.id;
        doCreatePost(post).then((response)=>{
            if(image){
            uploadPostImage(response.postId,image).then(res=>{
                toast.success("Image Uploaded!")
            }).catch(err=>{
                toast.error("Error in uploading Image!");
                console.log(err);
            })
            }
            setPosts([...posts,response])
            toast.success("Post Created Successfully!");
            setPost({
                title:"",
                content:"",
                categoryId:-1
            });
        }).catch((error)=>{
            // console.log(error);
            toast.error("Some error occured!");
        });
    }
    return (
        <div className="wrapper mt-4">
            <Card className="px-2 shadow border-0">
                <CardTitle className="text-center"><h1>What is going on in your mind?</h1></CardTitle>
                <CardBody>
                    <Form onSubmit={createPost}>
                        <FormGroup>
                            <Label for="title">Post Title</Label>
                            <Input 
                            id = "title"
                            name = "title"
                            type = "text"
                            placeholder="Enter the title here"
                            value = {post.title}
                            onChange = {fieldChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="content">Post Content</Label>
                            {/* <Input 
                            id = "content"
                            name = "content"
                            type = "textarea"
                            placeholder="Enter the content here"
                            style = {{height:"200px"}}
                            /> */}
                            <JoditEditor 
                            ref = {editor}
                            value = {post.content}
                            onChange = {contentChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Post Image</Label>
                            <Input id="image" type="file" onChange={handleImage}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="categoryId">Post Category</Label>
                            <Input 
                            id = "categoryId"
                            name = "categoryId"
                            type = "select"
                            onChange={fieldChange}
                            defaultValue = {0}
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
                            <Button type="submit" color="primary" className="rounded-0">Create Post</Button>
                            <Button className="ms-2 rounded-0" color="danger">Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default AddPost;