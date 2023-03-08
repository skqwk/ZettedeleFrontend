import React, {useState} from 'react';
import '../src/styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
    const [posts, setPosts] = useState([
            {id: 1, title: 'Java Script', 'body': 'Description'},
            {id: 2, title: 'Python', 'body': 'Description'},
            {id: 3, title: 'C++', 'body': 'Description'},
            {id: 4, title: 'Dart', 'body': 'Description'},
        ]
    );

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <PostList posts={posts} title={"Список постов"}/>
        </div>
    );
}

export default App;