import React from 'react';
import '../src/styles/App.css';
import PostItem from "./components/PostItem";
function App() {
  return (
    <div className="App">
        <PostItem post={{id: 1, title: 'Java Script', body: 'Description'}}/>
    </div>
  );
}

export default App;