import React, {useMemo, useState} from 'react';
import '../src/styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import Select from "./components/UI/select/Select";
import Input from "./components/UI/input/Input";

function App() {
    const [posts, setPosts] = useState([
            {id: 1, title: 'Java Script', 'body': 'Description'},
            {id: 2, title: 'Python', 'body': 'Description'},
            {id: 3, title: 'C++', 'body': 'Description'},
            {id: 4, title: 'Dart', 'body': 'Description'},
        ]
    );

    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const sortedPosts = useMemo(() => {
        console.log("Получение отсортированных постов");
        return selectedSort
            ? [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
            : posts;
    }, [selectedSort, posts])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const sortPosts = (sort) => {
        setSelectedSort(sort);
    }

    return (
        <div className="App">
            <PostForm create={createPost}/>
            <hr style={{margin: '15px'}}/>
            <div>
                <Input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Поиск"
                />
                <Select
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue="Сортировка по"
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'},
                    ]}/>
            </div>
            {posts.length !== 0
                ? <PostList remove={removePost} posts={sortedPosts} title={"Список постов"}/>
                : <h1 style={{textAlign: 'center'}}>Посты не найдены</h1>
            }
        </div>
    );
}

export default App;