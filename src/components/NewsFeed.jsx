import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { getAllPosts } from "../services/postService";
import { Post } from "./Post";

export const NewsFeed = ()=>{
    const [postContent,setPostContent] = useState({
        content:[],
        lastPage: false,
        pageNumber: "",
        pageSize: "",
        totalElements: "",
        totalPages: ""
    });
    useEffect(()=>{
        changePage(0);
    },[]);

    const changePage = (pageNumber,pageSize=5) => {
        // console.log(pageNumber);
        // console.log(postContent.pageNumber);
        // (pageNumber > postContent.pageNumber && postContent.lastPage)
        if(pageNumber===postContent.totalPages || pageNumber===-1){
            return;
        }
        getAllPosts(pageNumber,pageSize).then((response)=>{
            setPostContent(response);
            window.scroll(0,0);
        }).catch((error)=>{
            toast.error("Error Occured while fetching!");
        })
    }
    return (
        <>
            <div className="container-fluid pb-5">
                <Row>
                    <Col md={{
                        size: 10,
                        offset: 1
                    }}>
                        <h1>Blogs Count: {postContent?.totalElements}</h1>
                        {
                            postContent.content.map((post)=>{
                                return <Post key={post.postId} post={post}/>
                            })
                        }
                        
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={{
                        size: 10,
                        offset: 1
                    }}>
                <Pagination size = "lg">
                            <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber===0}>
                                <PaginationLink previous> 
                                Previous
                                </PaginationLink>
                            </PaginationItem>
                            

                            {
                                [...Array(postContent.totalPages)].map((item,index)=>{
                                    return <PaginationItem onClick={()=>changePage(index)} active={postContent.pageNumber === index} key={index}>
                                    <PaginationLink>
                                         {index+1}
                                    </PaginationLink>
                                    </PaginationItem>  
                                })
                            }

                            <PaginationItem onClick={()=>changePage(1+postContent.pageNumber)} disabled={postContent.lastPage}>
                                <PaginationLink next> 
                                Next
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                        </Col>
                </Row>
            </div>
        </>
    );
}