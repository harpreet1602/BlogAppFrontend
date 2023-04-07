import Base from "../components/Base";
import userContext from "../context/userContext";
const Services = () => {
    return (
        <>
            <userContext.Consumer>
                {
                    (user)=>(
                        <Base>
                            <h1>This is Services Component.</h1>
                            <h3>Name is: {user?.name}</h3>
                        </Base>
                    )
                }
            </userContext.Consumer>
        </>
    );
}
export default Services;