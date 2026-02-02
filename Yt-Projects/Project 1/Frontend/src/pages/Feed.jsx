import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

const Feed = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/get-posts")
      .then((res) => {
        setPosts(res.data.posts);
    })
  }, [])

  return (
    <div className="feed-section">
      

      {posts.map((post) => {
        return (
          <div className="card" key={post._id}>
            <div className="img-container">
              <img src={post.image} />
            </div>

            <div className="caption">
              <h4>{post.caption}</h4>
            </div>
          </div>
        );
      })

      }
      
    </div>
  );
}

export default Feed
