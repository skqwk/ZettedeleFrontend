import React, {useState} from 'react';
import '../src/styles/App.css';
import PostList from "./components/PostList";

function App() {
    const [posts, setPosts] = useState([
            {id: 1, title: 'Java Script', 'body': 'Description'},
            {id: 2, title: 'Python', 'body': 'Description'},
            {id: 3, title: 'C++', 'body': 'Description'},
            {id: 4, title: 'Dart', 'body': 'Description'},
        ]
    );

    return (
        <div className="App">
            <PostList posts={posts} title={"Список постов"}/>
        </div>
    );
}

export default App;