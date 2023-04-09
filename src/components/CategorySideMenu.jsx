import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategories } from "../services/categoryService";

export const CategorySideMenu = ()=>{

    const [categories,setCategories] = useState([])

    useEffect(()=>{
        loadAllCategories().then((res)=>{
            // console.log(res);
            setCategories(res);
        }).catch((err)=>{
            console.log(err);
            toast.error("Categories are not loaded!");
        })
    },[]);

    return (
        <>
            <ListGroup>
                
                <ListGroupItem tag={Link} to="/" action={true} className="border-0">
                    All Blogs
                </ListGroupItem>
                {
                    categories && categories.map((category)=>(
                         <ListGroupItem tag={Link} to={"/categories/" +category.categoryId} action={true} className="border-0 shadow-0 mt-1" key={category.categoryId}>
                            {category.categoryTitle}
                        </ListGroupItem>
                    ))
                }

                
            </ListGroup>
        </>
    );
}