import React from "react";
import { Container } from "reactstrap";
import Base from "../components/Base";
import { NewsFeed } from "../components/NewsFeed";
const Home = () =>{
    return (
        <React.Fragment>
            <Base>
                <Container className="mt-3">
                    <NewsFeed />
                </Container>
            </Base>
        </React.Fragment>
    );
}

export default Home;