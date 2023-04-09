import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import { CategorySideMenu } from "../components/CategorySideMenu";
import { Post } from "../components/Post";
import { loadPostByCategoryId } from "../services/postService";
export const Categories = ()=>{
    const {categoryId} = useParams();
    const [posts,setPosts] = useState([]);

    useEffect(()=>{

        loadPostByCategoryId(categoryId).then(data=>{
            // console.log(data);
            setPosts([...data]);
        }).catch((err)=>{
            console.log(err);
            toast.error("Error in loading the posts!");
        })
        // console.log(categoryId);

    },[categoryId]);
    return (
        <>
            <Base>
                <Container className="mt-3">
                <Row>
                    <Col md={2} className="pt-5">
                        <CategorySideMenu />
                    </Col>
                    <Col md={10}>
                        <h1>Blogs Count: {posts.length}</h1>
                        {
                            posts && posts.map((post,index)=>{
                                return (
                                    <Post post={post} key={index}/>
                                )
                            })
                        }
                        {posts.length===0?<h1>No posts are there in this Category</h1>:""}
                    </Col>
                </Row>
                </Container>
            </Base>
        </>
    );
}