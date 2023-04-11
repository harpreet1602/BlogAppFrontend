import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { getCurrentUser } from "../../auth";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import { Post } from "../../components/Post";
import { deletePostService, loadPostsUserWise } from "../../services/postService";
export const UserDashboard = () => {

    const [posts,setPosts] = useState([]);

    useEffect(()=>{
        loadPosts();
    },[]);

    function loadPosts(){
        loadPostsUserWise(getCurrentUser().id).then((data)=>{
            // console.log(data);
            setPosts([...data]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    function deletePost(post){
        deletePostService(post.postId).then((data)=>{
            console.log(data);
            toast.success("Post deleted successfully");
            let newPosts = posts.filter(p=>p.postId!==post.postId);
            setPosts([...newPosts]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <Base>
            <Container>
                <AddPost {...{posts,setPosts}}/>

                <h1 className="mt-3">Posts Count: ( {posts.length} )</h1>

                {posts.map((post,index)=>{
                    return <Post post={post} key={index} deletePost={deletePost}/>
                })}
            </Container>
        </Base>
    );
}