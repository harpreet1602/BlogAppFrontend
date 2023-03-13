import { Container } from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import { NewsFeed } from "../../components/NewsFeed";
export const UserDashboard = () => {
    return (
        <Base>
            <Container>
                <AddPost />
            </Container>
        </Base>
    );
}