import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/posts")
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const addPost = () => {
    axios.post("http://localhost:8000/posts", {
      title: title,
      content: content,
      author: author,
      published: false
    })
      .then(response => {
        setPosts([...posts, response.data]);
        setTitle("");
        setContent("");
        setAuthor("");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
<div class="container">
  <h1>Blog Posts</h1>
  <div class="add-post-form">
    <h2>Add Post</h2>
    <label for="title">Title:</label>
    <input type="text" id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
    <label for="author">Author:</label>
    <input type="text" id="author" value={author} onChange={(event) => setAuthor(event.target.value)} />
    <label for="content">Content:</label>
    <textarea id="content" value={content} onChange={(event) => setContent(event.target.value)}></textarea>
    <button type="button" onClick={addPost}>Add</button>
  </div>
  <h2>Posts:</h2>
  <ul>
    {posts.map(post => (
      <li key={post.id}>
        <div class="post-container">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
        </div>
      </li>
    ))}
  </ul>
</div>
  );
}

export default App;
