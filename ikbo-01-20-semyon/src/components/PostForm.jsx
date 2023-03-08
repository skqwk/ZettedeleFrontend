import React, {useState} from 'react';
import Input from "./UI/input/Input";
import Button from "./UI/button/Button";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {...post, id: Date.now()};
        create(newPost);
        setPost({title: '', body: ''});
    }

    return (
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
    );
};

export default PostForm;