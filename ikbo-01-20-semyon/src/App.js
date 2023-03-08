import React, {useState} from 'react';
import '../src/styles/App.css';
import PostList from "./components/PostList";
import Button from "./components/UI/button/Button";
import Input from "./components/UI/input/Input";

function App() {
    const [posts, setPosts] = useState([
            {id: 1, title: 'Java Script', 'body': 'Description'},
            {id: 2, title: 'Python', 'body': 'Description'},
            {id: 3, title: 'C++', 'body': 'Description'},
            {id: 4, title: 'Dart', 'body': 'Description'},
        ]
    );

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            id: Date.now(),
            title, body
        };
        setPosts([...posts, newPost]);
    }

    return (
        <div className="App">
            <form>
                <Input value={title}
                       onChange={e => setTitle(e.target.value)}
                       type="text"
                       placeholder="Название поста"/>
                <Input value={body}
                       onChange={e => setBody(e.target.value)}
                       type="text"
                       placeholder="Описание поста"/>
                <Button onClick={addNewPost}>Создать пост</Button>
            </form>

            <PostList posts={posts} title={"Список постов"}/>
        </div>
    );
}

export default App;