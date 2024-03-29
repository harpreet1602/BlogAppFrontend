import About from "./pages/About";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { UserDashboard } from "./pages/UserRoutes/UserDashboard";
import { PrivateRoute } from "./components/PrivateRoute";
import { ProfileInfo } from "./pages/UserRoutes/ProfileInfo";
import { PostPage } from "./pages/PostPage";
import UserProvider from "./context/UserProvider";
import { Categories } from "./pages/Categories";
import { UpdateBlog } from "./pages/UpdateBlog";
import { UpdateUserProfile } from "./components/UpdateUserProfile";
function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <ToastContainer position="bottom-center"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/posts/:postId" element = {<PostPage />} />
        <Route path="/categories/:categoryId" element={<Categories />} />

        <Route path="/user" element = {<PrivateRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profileinfo/:userId" element={<ProfileInfo />} />
          <Route path="updateprofileinfo/:userId" element={<UpdateUserProfile />} />
          <Route path="update-blog/:postId" element={<UpdateBlog />} />
        </Route>
        

      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
