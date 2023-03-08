import React, {useMemo, useState} from 'react';
import '../src/styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
            {id: 1, title: 'Java Script', 'body': 'Description'},
            {id: 2, title: 'Python', 'body': 'Description'},
            {id: 3, title: 'C++', 'body': 'Description'},
            {id: 4, title: 'Dart', 'body': 'Description'},
        ]
    );

    const [filter, setFilter] = useState({sort: '', query: ''})

    const sortedPosts = useMemo(() => {
        console.log('Sort change!')
        return filter.sort
            ? [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
            : posts;
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(p => p.title.toLowerCase()
            .includes(filter.query.toLowerCase()));
    }, [sortedPosts, filter.query])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {sortedAndSearchedPosts.length !== 0
                ? <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"}/>
                : <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
            }
        </div>
    );
}

export default App;