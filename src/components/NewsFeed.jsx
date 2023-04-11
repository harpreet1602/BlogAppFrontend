import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { Col, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { deletePostService, getAllPosts } from "../services/postService";
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
    const [currentPage,setCurrentPage] = useState(0);

    useEffect(()=>{
        changePage(currentPage);
    },[currentPage]);

    function deletePost(post){
        deletePostService(post.postId).then((data)=>{
            console.log(data);
            toast.success("Post deleted successfully");
            let newPosts = postContent.content.filter(p=>p.postId!==post.postId);
            setPostContent({...postContent,content:[...newPosts]});
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const changePage = (pageNumber,pageSize=5) => {
        // console.log(pageNumber);
        // console.log(postContent.pageNumber);
        // (pageNumber > postContent.pageNumber && postContent.lastPage)
        if(pageNumber===postContent.totalPages || pageNumber===-1){
            return;
        }
        getAllPosts(pageNumber,pageSize).then((response)=>{
            // this is without infinte scroll.
            // setPostContent(response);
            // window.scroll(0,0);

// this can also be done for infinite scroll where previous content should not get lost.
            // setPostContent({
            //     content: [...postContent.content,...response.content],        
            //     lastPage: response.lastPage,
            //     pageNumber: response.pageNumber,
            //     pageSize: response.pageSize,
            //     totalElements: response.totalElements,
            //     totalPages: response.totalPages
            // })

            // this is another simple way for infinite scroll change Page
            setPostContent({
                ...response,
                content: [...postContent.content,...response.content]        
            })
            
        }).catch((error)=>{
            toast.error("Error Occured while fetching!");
        })
    }
    const changePageInfinite = ()=>{
        console.log("Page changed");
        setCurrentPage(currentPage+1);
    }

    return (
        <>
            <div className="container-fluid pb-5">
                <Row>
                    <Col md={{
                        size: 12,
                    }}>
                        <h1>Blogs Count: {postContent?.content.length}</h1>
                        
                        <InfiniteScroll
                            dataLength={postContent.content.length}
                            next={changePageInfinite}
                            hasMore={!postContent.lastPage}

                        >
                            {
                                postContent.content.map((post)=>{
                                    return <Post deletePost={deletePost} key={post.postId} post={post}/>
                                })
                            }
                        </InfiniteScroll>
                    </Col>
                </Row>
                {/* <Row className="mt-3">
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
                </Row> */}
            </div>
        </>
    );
}