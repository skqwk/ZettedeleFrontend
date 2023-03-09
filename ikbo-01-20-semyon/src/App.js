import React, {useEffect, useState} from 'react';
import '../src/styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import Modal from "./components/UI/modal/Modal";
import Button from "./components/UI/button/Button";
import {usePosts} from "./hooks/usePost";
import axios from 'axios';
import PostService from "./API/PostService";

function App() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    useEffect(() => {
        fetchPosts();
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    async function fetchPosts() {
        const posts = await PostService.getAll();
        setPosts(posts);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    return (
        <div className="App">
            <Button style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Создать пост
            </Button>
            <Modal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </Modal>
            <hr style={{margin: '15px'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"}/>
        </div>
    );
}

export default App;