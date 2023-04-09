import React from "react";
import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import { CategorySideMenu } from "../components/CategorySideMenu";
import { NewsFeed } from "../components/NewsFeed";
const Home = () =>{
    return (
        <React.Fragment>
            <Base>
                <Container className="mt-3">
                <Row>
                    <Col md={2} className="pt-5">
                        <CategorySideMenu />
                    </Col>
                    <Col md={10}>
                        <NewsFeed />
                    </Col>
                </Row>
                </Container>
            </Base>
        </React.Fragment>
    );
}

export default Home;