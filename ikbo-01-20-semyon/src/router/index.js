import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Error from "../pages/Error";

export const routes = [
    {path: "/about", element: About},
    {path: "/posts", element: Posts},
    {path: "/posts/:id", element: PostIdPage}
]