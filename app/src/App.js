import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:80/api/posts`)
      .then(arr => {
        console.log(arr);
        setPosts(arr.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <h2>Posts:</h2>
      {posts &&
        posts.map(p => (
          <div className="card" key={p.id}>
            <h4>{p.title}</h4>
            <div>
              <h6>{p.contents}</h6>
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
