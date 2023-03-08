import React, {useState} from 'react';
import '../src/styles/App.css';
import PostList from "./components/PostList";
import Button from "./components/UI/button/Button";

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
            <form>
                <input type="text" placeholder="Название поста"/>
                <input type="text" placeholder="Описание поста"/>
                <Button disabled>Создать пост</Button>
            </form>
            
            <PostList posts={posts} title={"Список постов"}/>
        </div>
    );
}

export default App;