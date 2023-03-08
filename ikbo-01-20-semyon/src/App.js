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

    const [post, setPost] = useState({title: '', body: ''});
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const addNewPost = (e) => {
        e.preventDefault();
        setPosts([...posts, {...post, id: Date.now()}]);
        setPost({title: '', body: ''});
    }

    return (
        <div className="App">
            <form>
                <Input value={post.title}
                       placeholder="Название поста"
                       onChange={e => setPost({...post, title: e.target.value})}
                       type="text"
                />
                <Input value={post.body}
                       placeholder="Описание поста"
                       onChange={e => setPost({...post, body: e.target.value})}
                       type="text"
                />
                <Button onClick={addNewPost}>Создать пост</Button>
            </form>

            <PostList posts={posts} title={"Список постов"}/>
        </div>
    );
}

export default App;